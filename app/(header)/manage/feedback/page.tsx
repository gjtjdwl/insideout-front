'use client';
import { ManageAPI } from '@/app/api';
import { useUser } from '@/app/hooks/useUser';
import { useEffect, useState } from 'react';
import { RiMailSendFill } from 'react-icons/ri';
import { Improvements } from '@/app/types/manage';

const feedback = () => {
  const { user } = useUser();
  const [improvements, setImprovements] = useState<Improvements>();

  const fetchImprovements = async () => {
    try {
      const response = await ManageAPI.improvements(String(user?.userId));
      // 백엔드 응답을 Improvements 형식으로 변환
      const formattedImprovements = Object.entries(response).map(
        ([main, sub]) => ({
          main,
          sub: sub as string[],
        })
      );
      setImprovements(formattedImprovements);
    } catch (error: unknown) {
      console.error('개선사항 로딩 중 오류', error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchImprovements();
    }
  }, [user]);

  return (
    <div className="bg-customPink px-4 sm:px-[50px]">
      <div className="flex justify-center items-center bg-white w-full p-4 md:p-10 min-h-[calc(100vh-80px)]">
        <div className="max-w-[1200px] w-full">
          <div className="flex items-center justify-between p-4 mb-8 border-b">
            <div className="font-bold text-xl md:text-3xl text-gray-800">
              개선 사항
            </div>
            <div className="text-sm md:text-base text-gray-500">
              최근 30일간의 상담 데이터 기반
            </div>
          </div>
          <div className="flex justify-center flex-col items-center">
            <div className="w-full transition-opacity duration-300 ease-in-out">
              {!improvements ? (
                <div className="mx-auto max-w-md m-6 mt-12 p-6 border rounded-lg shadow-sm bg-white/50">
                  <div className="flex flex-col justify-center items-center">
                    <div className="flex justify-center text-gray-600">
                      <RiMailSendFill size={32} />
                    </div>
                    <div className="mt-4 text-base text-gray-700 font-medium">
                      개선사항을 수집 중 입니다
                    </div>
                    <div className="mt-2 text-sm text-gray-500">
                      조금만 기다려주세요...
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-4 w-full">
                  <div
                    className={`
                    grid gap-6 auto-rows-fr
                    ${
                      improvements.length === 1
                        ? 'flex justify-center'
                        : improvements.length === 2
                          ? 'grid-cols-1 sm:grid-cols-2 max-w-3xl mx-auto'
                          : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                    }
                  `}
                  >
                    {improvements.map((category, index) => (
                      <div
                        key={index}
                        className="w-full max-w-[350px] min-h-[280px] p-8 border rounded-lg shadow-sm hover:shadow-md transition-all duration-200 bg-white"
                      >
                        <div className="flex flex-col h-full">
                          <div className="mb-8 pb-4 text-center border-b">
                            <h3 className="text-xl md:text-2xl font-semibold text-gray-800">
                              {category.main}
                            </h3>
                          </div>
                          <div className="flex-grow space-y-4">
                            {category.sub.map((content, i) => (
                              <div
                                key={i}
                                className="text-sm md:text-base text-gray-600 hover:text-gray-800 transition-colors duration-200"
                              >
                                • {content}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="mt-12 md:mt-16">
              <button className="px-6 py-3 rounded-lg bg-gray-700 hover:bg-gray-600 text-white text-sm md:text-base transition-colors duration-200">
                이전 개선사항 보기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default feedback;
