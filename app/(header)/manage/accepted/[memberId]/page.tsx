'use client';
import { ManageAPI } from '@/app/api';
import { SessionIdResponse } from '@/app/types/manage';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const member = () => {
  const { memberId } = useParams();
  const [sessionList, setSessionList] = useState<SessionIdResponse[]>([]);

  const userSession = async () => {
    try {
      const response = await ManageAPI.userSession(String(memberId));
      setSessionList(response);
    } catch (error: unknown) {
      console.log('상담 세션 가져오는 중 오류 발생', error);
    }
  };

  useEffect(() => {
    if (memberId) {
      userSession();
    }
  }, [memberId]);
  return (
    <div>
      <div className="p-4">
        <span className="text-base md:text-xl font-semibold">{memberId}</span>
      </div>
      {sessionList.length === 0 ? (
        <div className="p-4 min-h-[50vh]">부서원의 상담 내역이 없습니다.</div>
      ) : (
        <div className="p-4 min-h-[50vh]">
          <ul role="list" className="">
            {sessionList.map((session, index) => (
              <li key={index} className="gap-x-6  cursor-pointer">
                <Link
                  href={`/manage/accepted/${memberId}/${session.sessionId}`}
                  className="flex items-center justify-between border mb-5 p-4"
                >
                  <div className="flex min-w-0 gap-x-4">
                    <div className="min-w-0 flex-auto">
                      <p className="max-w-[200px] lg:max-w-[850px] sm:max-w-[300px] truncate font-medium text-gray-900">
                        {session.sessionId}
                      </p>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
export default member;
