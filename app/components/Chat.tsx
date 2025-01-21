'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatAPI } from '../api';
import { MessageResponse } from '../types/chat';

interface ChatProps {
  currentSessionId: number;
  userId: string;
  messages: MessageResponse[];
  onEndChat: () => void;
  isClosed?: boolean;
}

const Chat: React.FC<ChatProps> = ({
  currentSessionId,
  userId,
  messages: initialMessages,
  onEndChat,
  isClosed,
}) => {
  const [message, setMessage] = useState('');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<MessageResponse[]>(initialMessages);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const currentMessage = message.trim();
    setMessage(''); // 입력창 즉시 비우기

    // 임시 메시지 ID 생성
    const tempMessageId = Date.now();

    // 사용자 메시지를 즉시 UI에 추가
    const userMessage: MessageResponse = {
      id: tempMessageId,
      sessionId: currentSessionId,
      authorType: 'USER',
      content: currentMessage,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) =>
      [...prev, userMessage].sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      )
    );

    try {
      const now = new Date();
      const koreanTime = new Date(now.getTime() + 9 * 60 * 60 * 1000); // UTC+9

      const response = await ChatAPI.sendMessage({
        sessionId: currentSessionId,
        userId: userId,
        content: currentMessage,
        createdAt: koreanTime.toISOString(),
      });

      // AI 응답을 받으면 추가
      if (response) {
        const aiMessage: MessageResponse = {
          id: response.id,
          sessionId: currentSessionId,
          authorType: response.authorType,
          content: response.content,
          createdAt: response.createdAt,
        };
        setMessages((prev) =>
          [...prev, aiMessage].sort(
            (a, b) =>
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          )
        );
      }
    } catch (error) {
      console.error('Failed to send message:', error);
      // 에러 발생 시 마지막 메시지 제거
      setMessages((prev) => prev.filter((msg) => msg.id !== tempMessageId));
      setMessage(currentMessage);
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

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* 고정된 상단 안내 문구 */}
      <div className="sticky top-0 bg-white px-6 pt-5 pb-4 z-10">
        <div className="flex items-center gap-4">
          <div className="bg-blue-50 rounded-xl flex-1">
            <div className="flex items-center px-4 py-3">
              <span className="text-sm text-blue-700">
                반갑습니다. 지금 하는 대화는 동의 없이 공개되지 않으니 편하게
                속마음을 이야기해보세요.
              </span>
            </div>
          </div>
          <button
            onClick={onEndChat}
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
                        </div>
                      </div>
                    </div>
                  )}

                  {message.authorType === 'USER' && (
                    <div className="flex flex-col items-end">
                      <div className="bg-pink-100 px-4 py-2 rounded-2xl rounded-tr-none max-w-[600px]">
                        {message.content}
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </>
          )}
        </AnimatePresence>
      </div>

      {/* 입력 폼 */}
      <div className="border-t">
        <form onSubmit={handleSubmit} className="flex gap-2 p-4">
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
        </form>
      </div>
    </div>
  );
};

export default Chat;
