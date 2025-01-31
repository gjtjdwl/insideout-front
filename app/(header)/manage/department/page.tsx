'use client';

import Image from 'next/image';
import DepartmentCard from '@/app/components/DepartmentCard';
import { ManageAPI } from '@/app/api';
import { useEffect, useState } from 'react';
import { useUser } from '@/app/hooks/useUser';
import { MemberData, statisticData } from '@/app/types/manage';
import { formatDateTimeDepart } from '@/app/utils/dataFormatter';

export default function managerAdminPage() {
  const route = `/manage/accepted/`;
  const { user } = useUser();
  const [memberList, setMemberList] = useState<MemberData[]>([]);
  const [orsList, setOrsList] = useState<statisticData[]>([]);
  //ors
  const orsStats = async () => {
    try {
      const response = await ManageAPI.statsORS(String(user?.userId));

      const dates = Object.keys(response.weeklyStatistics).reverse(); // ["2025-01-26","2025-01-19"]
      const formatList = dates.map((date, index) => {
        const current = response.weeklyStatistics[date];
        const prev = response.weeklyStatistics[dates[index - 1]];
        //지난주 평균, 분산
        const prevAvg = prev ? prev.average : current.average;
        const prevVariance = prev ? prev.variance : current.variance;
        const constrastAvg = (current.average - prevAvg).toFixed(2);
        const constrastVariance = (current.variance - prevVariance).toFixed(2);
        // 양수일 경우 앞에 "+" 붙이기
        const formattedConstrastAvg =
          Number(constrastAvg) >= 0 ? `+${constrastAvg}` : constrastAvg;
        const formattedConstrastVariance =
          Number(constrastVariance) >= 0
            ? `+${constrastVariance}`
            : constrastVariance;

        const formatDate = formatDateTimeDepart(String(date));
        return {
          date: formatDate,
          average: Number(current.average.toFixed(2)),
          variance: Number(current.variance.toFixed(2)),
          constrastAvg: formattedConstrastAvg,
          constrastVariance: formattedConstrastVariance,
        };
      });
      console.log('ors:', formatList);
      setOrsList(formatList);
    } catch (error: unknown) {
      console.error('ORS통계 불러오는 중 오류 발생', error);
    }
  };
  const member = async () => {
    try {
      const response = await ManageAPI.departmentUser(String(user?.userId));
      setMemberList(response);
    } catch (error: unknown) {
      console.error('부서원 불러오는 중 오류 발생', error);
    }
  };

  useEffect(() => {
    if (user) {
      orsStats();
      member();
    }
  }, [user, orsList]);
  return (
    <>
      <div className="bg-customPink px-4 sm:px-[50px]">
        <div className="items-center flex justify-center bg-white w-full p-10">
          <div className="max-w-[1200px] w-full">
            <div className="flex items-center justify-between p-4 border-b">
              <div className="font-bold text-xl md:text-3xl">부서 관리</div>
            </div>
            <div className="m-10">
              <div className="mt-16 font-medium text-lg md:text-2xl">
                부서 통계
              </div>
              <div className="grid md:grid-flow-col gap-x-8 justify-center">
                <div className="flex flex-col items-end">
                  <Image
                    src="/graph.png"
                    alt="그래프 들어갈 자리"
                    width={500}
                    height={300}
                  />
                </div>
                <div className="flex flex-col text-center items-cneter ">
                  <div className="p-3 md:p-8 border border-[#525252] md:h-[80%] flex flex-col items-start justify-center">
                    {orsList && (
                      <>
                        <div className="mb-2 md:mb-5 text-base md:text-2xl text-center">
                          <span className="">2025년 </span>
                          <span className="ml-1">ORS점수 </span>
                        </div>
                        <div className="flex items-end text-sm md:text-xl w-full justify-around ">
                          <div className="flex flex-col items-end ">
                            <span>
                              {orsList[orsList.length - 1]?.date?.substring(6)}{' '}
                            </span>
                            <span className="">지난 주 대비</span>
                          </div>
                          <div className="flex flex-col items-end ml-3">
                            <span>평균 </span>
                            <span>{orsList[orsList.length - 1]?.average} </span>
                            <span
                              className={`${Number(orsList[orsList.length - 1]?.constrastAvg) < 0 ? 'text-blue-500' : 'text-red-400'}`}
                            >
                              {orsList[orsList.length - 1]?.constrastAvg}{' '}
                            </span>
                          </div>
                          <div className="flex flex-col items-end ml-3">
                            <span>분산 </span>
                            <span>
                              {orsList[orsList.length - 1]?.variance}{' '}
                            </span>
                            <span
                              className={`${Number(orsList[orsList.length - 1]?.constrastVariance) < 0 ? 'text-blue-500' : 'text-red-400'}`}
                            >
                              {orsList[orsList.length - 1]?.constrastVariance}{' '}
                            </span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-14 md:mt-24 font-medium text-lg md:text-2xl">
                부서원
              </div>
              {memberList.length === 0 ? (
                <div className="mt-9 min-h-[30vh]">부서원이 없습니다.</div>
              ) : (
                <div className="grid grid-cols-2 gap-x-6 gap-y-5 mt-9">
                  {memberList.map((person, index) => (
                    <DepartmentCard
                      route={`${route}${person.userId}`}
                      name={person.name}
                      id={person.userId}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
