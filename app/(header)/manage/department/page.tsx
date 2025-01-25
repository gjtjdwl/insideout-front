'use client';

import Image from 'next/image';
import DepartmentCard from '@/app/components/DepartmentCard';
import { ManageAPI } from '@/app/api';
import { useEffect, useState } from 'react';
import { useUser } from '@/app/hooks/useUser';
import { MemberData, ORSRequest } from '@/app/types/manage';

export default function managerAdminPage() {
  const route = `/manage/accepted/`;
  const { user } = useUser();
  const [memberList, setMemberList] = useState<MemberData[]>([]);
  const [ors, setOrs] = useState<ORSRequest[]>();
  //ors
  const orsStats = async () => {
    try {
      const response = await ManageAPI.statsORS(String(user?.userId));
      setOrs(response);
      console.log(response);
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
    member();
    orsStats();
  }, []);
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
              <div className="grid grid-flow-col gap-x-8 justify-center">
                <div className="flex flex-col items-end">
                  <Image
                    src="/graph.png"
                    alt="그래프 들어갈 자리"
                    width={500}
                    height={300}
                  />
                  <div className="mt-5 text-base md:text-2xl text-center">
                    전 월 대비 ORS 점수 변동량 : - 400%
                  </div>
                </div>
                <div className="flex flex-col text-center items-cneter ">
                  <div className="p-10 border border-[#525252] h-[80%] flex flex-col items-start justify-center">
                    <div className="text-base md:text-2xl ">
                      ORS 점수 평균 : 36점
                    </div>
                    <div className="text-base md:text-2xl">
                      ORS 점수 분산 : 4
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-24 font-medium text-lg md:text-2xl">
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
