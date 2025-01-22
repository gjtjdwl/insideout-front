'use client';

import Image from 'next/image';
import DepartmentCard from '@/app/components/DepartmentCard';

export default function webAdminPage() {
  const route = '/admin/web/department';
  return (
    <>
      <div className="bg-customPink px-4 sm:px-[50px]">
        <div className="items-center bg-white w-full p-10 min-h-[50vh]">
          <div className="flex items-center justify-between p-4 border-b">
            <div className="font-bold text-xl md:text-3xl">사이트 관리</div>
          </div>
          <div className="m-10">
            <div className="mt-16 font-mediumt text-lg md:text-2xl">
              사이트 통계
            </div>
            <div className="grid grid-flow-col gap-x-8 justify-center">
              <div className="flex flex-col items-end">
                <Image
                  src="/graph.png"
                  alt="그래프 들어갈 자리"
                  width={500}
                  height={300}
                  style={{ height: '330px' }}
                  className=""
                />
                <div className="mt-5 text-base lg:text-2xl text-center">
                  전 월 대비 SRS 점수 변동량 : - 70%
                </div>
              </div>
              <div className="flex flex-col text-center items-cneter ">
                <div className="p-10 border border-[#525252] h-[80%] flex flex-col items-start justify-center">
                  <div className="text-base lg:text-2xl ">
                    SRS 점수 평균 : 10점
                  </div>
                  <div className="text-base lg:text-2xl">SRS 점수 분산 : 4</div>
                </div>
              </div>
            </div>
            <div className="mt-24 font-medium text-lg lg:text-2xl">부서</div>
            <div className="grid grid-cols-1 gap-x-6 gap-y-5 mt-9">
              <DepartmentCard route={route} name={'부서1'} id={'부서장'} />
              <DepartmentCard route={route} name={'프론트엔드'} id={'김성미'} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
