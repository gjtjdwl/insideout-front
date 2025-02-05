'use client';

import React, { useState, useEffect } from 'react';
import { useUser } from '../../hooks/useUser';
import { ChatAPI } from '../../api';
import { SessionInfo, MessageResponse } from '../../types/chat';
import ChatSideBar from '../../components/ChatSideBar';
import Chat from '../../components/Chat';
import EmptyChat from '../../components/EmptyChat';
import ScaleForm from '../../components/ScaleForm';
import { ORS_CONFIG, SRS_CONFIG } from '../../constants/scaleFormConfig';
import ConsentModal from '../../components/ConsentModal';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { FiChevronRight } from 'react-icons/fi';

export default function ChatPage() {
  const { user } = useUser();
  const [sessions, setSessions] = useState<SessionInfo[]>([]);
  const [currentSession, setCurrentSession] = useState<SessionInfo | null>(
    null
  );
  const [messages, setMessages] = useState<MessageResponse[]>([]);
  const [isORSOpen, setIsORSOpen] = useState(false);
  const [isSRSOpen, setIsSRSOpen] = useState(false);
  const [isConsentModalOpen, setIsConsentModalOpen] = useState(false);
  const [srsScores, setSrsScores] = useState<number[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  useEffect(() => {
    if (user?.userId) {
      loadSessions();
    }
  }, [user]);

  const loadSessions = async () => {
    try {
      const response = await ChatAPI.getSessions(user!.userId);
      setSessions(response);
    } catch (error) {
      console.error('Failed to load sessions:', error);
    }
  };

  const loadMessages = async (sessionId: number) => {
    if (!sessionId) {
      console.error('Invalid sessionId:', sessionId);
      return;
    }

    try {
      const response = await ChatAPI.getMessages(sessionId);
      setMessages(response);
    } catch (error) {
      console.error('Failed to load messages:', error);
    }
  };

  const handleCreateChat = async () => {
    try {
      if (!user?.userId) return;
      const session = await ChatAPI.createSession({ userId: user.userId });
      console.log('Created session:', session);
      if (!session?.id) {
        console.error('Invalid session response:', session);
        return;
      }
      setCurrentSession(session);
      setIsORSOpen(true);
    } catch (error) {
      console.error('Failed to create session:', error);
    }
  };

  const handleORSSubmit = async (scores: number[]) => {
    console.log('Current session:', currentSession);
    if (!currentSession?.id) {
      console.error('No active session');
      return;
    }

    try {
      const totalScore = scores.reduce((sum, score) => sum + score, 0);

      await ChatAPI.updateOrsScore({
        sessionId: currentSession.id,
        orsScore: totalScore,
      });

      await loadSessions();
      await loadMessages(currentSession.id);
      setIsORSOpen(false);

      const updatedSession = {
        ...currentSession,
        orsScore: totalScore,
      };
      setCurrentSession(updatedSession);
    } catch (error) {
      console.error('Failed to submit ORS:', error);
    }
  };

  const handleSRSSubmit = async (scores: number[]) => {
    const totalScore = scores.reduce((sum, score) => sum + score, 0);
    setSrsScores([totalScore]);
    setIsSRSOpen(false);
    setIsConsentModalOpen(true);
  };

  const handleConsent = async (withConsent: boolean) => {
    if (!currentSession) return;

    try {
      await ChatAPI.terminateSession({
        sessionId: currentSession.id,
        srsScore: srsScores[0],
        agreement: withConsent ? 'ACCEPTED' : 'DENIED',
      });
      setCurrentSession(null);
      await loadSessions();
      setIsConsentModalOpen(false);
    } catch (error) {
      console.error('Failed to terminate session:', error);
    }
  };

  const handleConsentDeny = () => {
    // 비동의 처리 로직
    console.log('상담 전문 제공 비동의');
    setIsConsentModalOpen(false);
    setCurrentSession(null);
  };

  const handleChatEnd = () => {
    setIsSRSOpen(true);
  };

  return (
    <>
      <div className="min-h-screen bg-pink-50 py-[60px]">
        <div className="flex h-[calc(100vh-120px)] mx-4 md:mx-0">
          <div className="md:w-[50px]" />
          <div className="flex flex-1 gap-[40px] max-w-[1400px] mx-auto relative">
            <div className='hidden md:flex'>
            <ChatSideBar
              sessions={sessions}
              userName={user?.name || '사용자'}
              selectedSessionId={currentSession?.id}
              onSessionSelect={(sessionId) => {
                if (!sessionId) return;
                const session = sessions.find((s) => s.id === sessionId);
                if (session) {
                  setCurrentSession(session);
                  loadMessages(sessionId);
                }
              }}
              onCreateChat={handleCreateChat}
              
              />
              </div>
            <div className="flex md:hidden absolute top-[-20]">
              <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <span className="sr-only">메뉴 열기</span>
                {mobileMenuOpen ? (
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <FiChevronRight
                    size={40}
                    color="#5C5C5C"
                    className="h-6 w-6"
                    aria-hidden="true"
                  />
                )}
              </button>
            </div>
            {
              mobileMenuOpen && (
              <div className='absolute '>
                <ChatSideBar
              sessions={sessions}
              userName={user?.name || '사용자'}
              selectedSessionId={currentSession?.id}
              onSessionSelect={(sessionId) => {
                if (!sessionId) return;
                const session = sessions.find((s) => s.id === sessionId);
                if (session) {
                  setCurrentSession(session);
                  loadMessages(sessionId);
                }
              }}
              onCreateChat={handleCreateChat}
            />
            </div>
              )
            }
            <div className="flex-1 bg-white rounded-[20px] overflow-hidden">
              {currentSession ? (
                <Chat
                  currentSessionId={currentSession.id}
                  userId={user?.userId || ''}
                  messages={messages}
                  onEndChat={() => setIsSRSOpen(true)}
                  isClosed={currentSession.status === 'TERMINATED'}
                />
              ) : (
                <EmptyChat onCreateChat={handleCreateChat} />
              )}
            </div>
          </div>
          <div className="md:w-[50px]" />
        </div>
      </div>
      <ScaleForm
        isOpen={isORSOpen}
        onClose={() => {
          setIsORSOpen(false);
          setCurrentSession(null);
        }}
        onSubmit={handleORSSubmit}
        {...ORS_CONFIG}
        type="ORS"
      />
      <ScaleForm
        isOpen={isSRSOpen}
        onClose={() => setIsSRSOpen(false)}
        onSubmit={handleSRSSubmit}
        {...SRS_CONFIG}
        type="SRS"
      />
      <ConsentModal
        isOpen={isConsentModalOpen}
        onClose={() => setIsConsentModalOpen(false)}
        onConfirm={handleConsent}
      />
    </>
  );
}
