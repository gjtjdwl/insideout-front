'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatAPI } from '../api';
import { MessageRequest, MessageResponse } from '../types/chat';

interface ChatProps {
  currentSessionId: number;
  userId: string;
  messages: MessageResponse[];
  onEndChat: () => void;
  isClosed?: boolean;
  onSessionStatusChange?: (
    sessionId: number,
    status: 'ACTIVE' | 'TERMINATED'
  ) => void;
}

interface ImageUploadResponse {
  filePath: string;
  message: string;
}

const Chat: React.FC<ChatProps> = ({
  currentSessionId,
  userId,
  messages: initialMessages,
  onEndChat,
  isClosed,
  onSessionStatusChange,
}) => {
  const [message, setMessage] = useState('');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<MessageResponse[]>(initialMessages);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    setMessages(
      [...initialMessages].sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      )
    );
  }, [initialMessages]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB 제한
        alert('파일 크기는 5MB를 초과할 수 없습니다.');
        return;
      }
      setSelectedImage(file);
    }
  };

  const uploadImage = async (file: File): Promise<ImageUploadResponse> => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await ChatAPI.uploadImage(formData);
      return response;
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() && !selectedImage) return;

    let imageUrl = '';
    const currentMessage = message;
    setMessage(''); // 입력창 즉시 비우기
    const currentImage = selectedImage;
    setSelectedImage(null); // 이미지 선택 즉시 비우기
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    try {
      const now = new Date();
      const koreanTime = new Date(now.getTime() + 9 * 60 * 60 * 1000); // UTC+9
      if (currentImage) {
        const uploadResponse = await uploadImage(currentImage);
        imageUrl = uploadResponse.filePath;
      }

      // 사용자 메시지 즉시 표시
      const userMessage: MessageResponse = {
        id: Date.now(), // 임시 ID
        sessionId: currentSessionId,
        authorType: 'USER',
        content: currentMessage,
        createdAt: koreanTime.toISOString(),
        imageUrl: imageUrl || undefined,
      };
      setMessages((prev) => [...prev, userMessage]);
      setIsTyping(true);

      // 서버로 메시지 전송
      const response = await ChatAPI.sendMessage({
        sessionId: currentSessionId,
        userId: userId,
        content: currentMessage,
        createdAt: koreanTime.toISOString(),
        imageUrl: imageUrl || null,
      });

      // AI 응답 표시
      if (response) {
        const aiMessage: MessageResponse = {
          id: response.id,
          sessionId: currentSessionId,
          authorType: response.authorType,
          content: response.content,
          createdAt: response.createdAt,
          imageUrl: response.imageUrl,
        };
        setMessages((prev) => [...prev, aiMessage]);
      }
    } catch (error) {
      console.error('Failed to send message:', error);
      setMessages((prev) => prev.slice(0, -1)); // 에러 시 마지막 메시지 제거
      setMessage(currentMessage); // 에러 시 메시지 복원
    } finally {
      setIsTyping(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      if (!('webkitSpeechRecognition' in window)) {
        alert('이 브라우저는 음성 인식을 지원하지 않습니다.');
        return;
      }

      const recognition = new window.webkitSpeechRecognition();
      recognition.lang = 'ko-KR';
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0].transcript)
          .join('');
        setMessage(transcript);
      };

      recognition.onerror = (event: Event) => {
        console.error('Speech recognition error:', event);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
      setIsListening(true);
    }
  };

  // 컴포넌트 언마운트 시 음성 인식 정리
  useEffect(() => {
    return () => {
      recognitionRef.current?.stop();
    };
  }, []);

  const handleEndChat = () => {
    onEndChat();
    // 세션 상태 변경을 부모 컴포넌트에 알림
    onSessionStatusChange?.(currentSessionId, 'TERMINATED');
  };

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* 고정된 상단 안내 문구 */}
      <div className="sticky top-0 bg-white px-6 pt-5 pb-4 z-10">
        <div className="flex items-center gap-4">
          <div className="bg-blue-50 rounded-xl flex-1">
            <div className="flex items-center px-4 py-3">
              <span className="text-sm text-blue-700">
                {isClosed
                  ? '채팅이 종료되었습니다.'
                  : '반갑습니다. 지금 하는 대화는 동의 없이 공개되지 않으니 편하게 속마음을 이야기해보세요.'}
              </span>
            </div>
          </div>
          <button
            onClick={handleEndChat}
            className="text-gray-500 hover:text-gray-700 py-2 px-4 transition-colors whitespace-nowrap"
          >
            <span>종료하기 ›</span>
          </button>
        </div>
      </div>

      {/* 스크롤 가능한 메시지 컨테이너 */}
      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto px-6 messages-container"
      >
        <AnimatePresence mode="wait">
          {!isTransitioning && (
            <>
              {messages.map((message, index) => (
                <motion.div
                  key={message.id || `temp-message-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                  className={`flex items-start gap-4 mb-6 ${
                    message.authorType === 'USER' ? 'justify-end' : ''
                  }`}
                >
                  {message.authorType === 'AI' && (
                    <div className="flex items-start gap-2">
                      <div className="w-8 h-8 flex justify-center items-center text-lg">
                        🤗
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-500 mb-1">
                          마음이
                        </span>
                        <div className="bg-gray-100 px-4 py-2 rounded-2xl rounded-tl-none max-w-[600px]">
                          {message.content}
                          {message.imageUrl && (
                            <img
                              src={message.imageUrl}
                              alt="첨부 이미지"
                              className="mt-2 max-w-full rounded-lg"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {message.authorType === 'USER' && (
                    <div className="flex flex-col items-end">
                      <div className="bg-pink-100 px-4 py-2 rounded-2xl rounded-tr-none max-w-[600px]">
                        {message.content}
                        {message.imageUrl && (
                          <img
                            src={message.imageUrl}
                            alt="첨부 이미지"
                            className="mt-2 max-w-full rounded-lg"
                          />
                        )}
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-start gap-4 mb-6"
                >
                  <div className="flex items-start gap-2">
                    <div className="w-8 h-8 flex justify-center items-center text-lg">
                      🤗
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-500 mb-1">마음이</span>
                      <div className="bg-gray-100 px-4 py-2 rounded-2xl rounded-tl-none">
                        상담사가 답변을 작성중입니다...
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </>
          )}
        </AnimatePresence>
      </div>

      {/* 입력 폼 */}
      <div className="border-t">
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 p-4">
          {selectedImage && (
            <div className="flex items-center gap-2 px-4">
              <div className="flex items-center gap-2">
                <img
                  src={URL.createObjectURL(selectedImage)}
                  alt="미리보기"
                  className="h-20 w-20 object-cover rounded-lg"
                />
                <span className="text-sm text-gray-500">
                  {selectedImage.name}
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSelectedImage(null);
                  if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                  }
                }}
                className="text-red-500 hover:text-red-700"
              >
                ✕
              </button>
            </div>
          )}
          <div className="flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={
                isClosed ? '종료된 상담입니다' : '메시지를 입력하세요...'
              }
              disabled={isClosed}
              className={`flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-pink-300 
                ${isClosed ? 'bg-gray-100 cursor-not-allowed' : ''}`}
            />
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageSelect}
              accept="image/*"
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isClosed}
              className={`px-4 rounded-xl transition-colors ${
                isClosed
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              📎
            </button>
            <button
              type="button"
              onClick={toggleListening}
              disabled={isClosed}
              className={`px-4 rounded-xl transition-colors ${
                isClosed
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : isListening
                    ? 'bg-pink-100 text-gray-700 hover:bg-pink-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {isListening ? '🎤' : '🎙️'}
            </button>
            <button
              type="submit"
              disabled={isClosed}
              className={`px-6 py-2 rounded-xl transition-colors ${
                isClosed
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-customPink text-black hover:bg-customPinkHover'
              }`}
            >
              전송
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Chat;
