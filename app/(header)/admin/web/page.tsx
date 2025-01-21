'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import DepartmentCard from '@/app/components/DepartmentCard';

export default function webAdminPage() {
  return (
    <>
      <div className="bg-customPink px-4 sm:px-[50px]">
        <div className="bg-white px-44 py-16">
          <div className="flex items-center justify-between p-4 border-b">
            <div className="font-bold text-xl md:text-3xl">사이트 관리</div>
          </div>
          <div className="mt-16 font-medium text-2xl">사이트 통계</div>
          <div className="flex justify-center">
            <div>
              <Image
                src="/graph.png"
                alt="그래프 들어갈 자리"
                width={500}
                height={300}
                style={{ height: '330px' }}
                className="ml-20"
              />
              <div className="text-2xl text-center pl-20 pt-10">
                전 월 대비 SRS 점수 변동량 : + 500%
              </div>
            </div>
            <div className="flex flex-col text-center  items-cneter w-[50%] pl-24">
              <div className="border border-black">
                <div className="text-2xl mt-28">
                  사이트 SRS 점수 평균 : 100점
                </div>
                <div className="text-2xl mt-4 mb-32">
                  사이트 SRS 점수 분산 : 0
                </div>
              </div>
            </div>
          </div>
          <div className="mt-24 font-medium text-2xl">부서</div>

          <DepartmentCard />
          <DepartmentCard />
        </div>
      </div>
    </>
  );
}
