'use client';
import { ManageAPI } from '@/app/api';
import { useDepartment } from '@/app/context/DepartmentContext';
import { SessionIdResponse } from '@/app/types/manage';
import { formatDateTimeSummaryChart } from '@/app/utils/dataFormatter';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const member = () => {
  const [sessionList, setSessionList] = useState<SessionIdResponse[]>([]);
  const { selectedPerson } = useDepartment();
  const userSession = async () => {
    try {
      const response = await ManageAPI.userSession(String(selectedPerson?.id));
      setSessionList(response);
    } catch (error: unknown) {
      console.log('상담 세션 가져오는 중 오류 발생', error);
    }
  };

  useEffect(() => {
    if (selectedPerson?.id) {
      userSession();
    }
  }, [selectedPerson?.id]);
  return (
    <div>
      <div className="p-4">
        <span className="text-base md:text-xl font-semibold">
          {selectedPerson?.name}님
        </span>
      </div>
      {sessionList.length === 0 ? (
        <div className="p-4 min-h-[50vh]"> 상담 내역이 없습니다.</div>
      ) : (
        <div className="p-4 min-h-[50vh]">
          <ul role="list" className="">
            {sessionList.map((session) => (
              <li key={session.sessionId} className="gap-x-6  cursor-pointer">
                <Link
                  href={`/manage/accepted/${session.sessionId}?date=${formatDateTimeSummaryChart(session.createdAt)}`}
                  className="flex items-center justify-between border mb-5 p-4"
                >
                  <div className="flex min-w-0 gap-x-4 text-sm md:text-base">
                    <div className="min-w-0 flex-auto">
                      <p className="max-w-[200px] lg:max-w-[850px] sm:max-w-[300px] truncate font-medium text-gray-900">
                        {formatDateTimeSummaryChart(session.createdAt)}
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
