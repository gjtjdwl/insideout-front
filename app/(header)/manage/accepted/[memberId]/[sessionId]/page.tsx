'use client';
import { FiChevronLeft } from 'react-icons/fi';
import { useParams, useRouter } from 'next/navigation';
import { ManageAPI } from '@/app/api';
import { useEffect, useRef, useState } from 'react';
import { MessageResponse } from '@/app/types/chat';
import { motion, AnimatePresence } from 'framer-motion';

const chatSession = () => {
  const { memberId, sessionId } = useParams();
  const router = useRouter();
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<MessageResponse[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const chatContents = async () => {
    try {
      const response = await ManageAPI.sessionChat(Number(sessionId));
      setMessages(response);
    } catch (error: unknown) {
      console.log('상담 내용 가져오는 중 오류 발생', error);
    }
  };

  useEffect(() => {
    chatContents();
  }, []);
  return (
    <div>
      <div className="p-2 sm:p-4 flex">
        <FiChevronLeft
          type="button"
          size={20}
          cursor={'pointer'}
          onClick={() => router.back()}
          className=" mt-0.5 sm:mt-1 mr-3 text-gray-600 hover:text-gray-900"
        />
        <span className="text-base md:text-xl font-semibold">
          {memberId} / {sessionId}
        </span>
      </div>
      <div className="sm:p-4 md:mx-9 min-h-[50vh] ">
        <div
          ref={messagesContainerRef}
          className="flex-1 p-3 overflow-y-auto md:px-6 messages-container max-h-[70vh]"
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
                    className={`flex items-start gap-4 mb-3 sm:mb-6 ${
                      message.authorType === 'USER' ? 'justify-end' : ''
                    }`}
                  >
                    {message.authorType === 'AI' && (
                      <div className="flex items-start gap-2">
                        <div className="w-8 h-8 flex justify-center items-center text-xs/6 sm:text-lg">
                          🤗
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs sm:text-sm text-gray-500 mb-1">
                            마음이
                          </span>
                          <div className="text-xs sm:text-base bg-gray-100 p-2 sm:px-4 sm:py-2 rounded-2xl rounded-tl-none max-w-[600px]">
                            {message.content}
                          </div>
                        </div>
                      </div>
                    )}

                    {message.authorType === 'USER' && (
                      <div className="flex flex-col items-end">
                        <div className="text-xs sm:text-base bg-pink-100 p-2 sm:px-4 sm:py-2 rounded-2xl rounded-tr-none max-w-[600px]">
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
      </div>
    </div>
  );
};

export default chatSession;
