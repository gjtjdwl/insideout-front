'use client';

import Image from 'next/image';
import DepartmentCard from '@/app/components/DepartmentCard';

export default function managerAdminPage() {
  const route = '/manage/accepted';
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
                    style={{ height: '330px' }}
                    className=""
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
              <div className="grid grid-cols-2 gap-x-6 gap-y-5 mt-9">
                <DepartmentCard route={route} name={'부서원1'} id={'아이디1'} />
                <DepartmentCard route={route} name={'부서원2'} id={'아이디2'} />
                <DepartmentCard route={route} name={'부서원2'} id={'아이디2'} />
                <DepartmentCard route={route} name={'부서원2'} id={'아이디2'} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
