'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { SessionInfo } from '../types/chat';

interface ChatSideBarProps {
  sessions: SessionInfo[];
  userName: string;
  selectedSessionId?: number;
  onSessionSelect?: (sessionId: number) => void;
  onCreateChat: () => void;
}

const ChatSideBar: React.FC<ChatSideBarProps> = ({
  sessions,
  userName,
  selectedSessionId,
  onSessionSelect,
  onCreateChat,
}) => {
  const router = useRouter();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ko-KR', {
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }).format(date);
  };

  return (
    <div className="w-[280px] bg-white rounded-[20px] p-6 flex flex-col">
      {/* 사용자 정보 */}
      <div className="mb-6">
        <h2 className="text-gray-600 mb-1 text-sm">{userName}</h2>
        <h1 className="text-xl font-bold">기억구슬</h1>
      </div>

      {/* 새 상담 버튼 */}
      <div className="mb-4">
        <button
          onClick={onCreateChat}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
        >
          <span>⭐</span>
          <span>새로운 상담</span>
        </button>
      </div>

      {/* 세션 목록 */}
      <div className="flex-1">
        {sessions
          .filter((session) => session && session.id)
          .map((session) => (
            <button
              key={`session-${session.id}-${session.date}`}
              onClick={() => onSessionSelect?.(session.id)}
              className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
                selectedSessionId === session.id ? 'bg-gray-100' : ''
              }`}
            >
              <span>{session.status === 'ACTIVE' ? '🟢' : '⭐'}</span>{' '}
              {formatDate(session.date)}
            </button>
          ))}
      </div>

      {/* 뒤로가기 버튼 */}
      <button
        onClick={() => router.push('/')}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 py-2"
      >
        <span>←</span> 본부 나가기
      </button>
    </div>
  );
};

export default ChatSideBar;
