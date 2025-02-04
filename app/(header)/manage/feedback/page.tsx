'use client';
import { ManageAPI } from '@/app/api';
import { useUser } from '@/app/hooks/useUser';
import { useEffect, useState } from 'react';
import { RiMailSendFill } from 'react-icons/ri';

const feedback = () => {
  const { user } = useUser();
  const [improvv, setImprov] = useState();

  const improv = [
    {
      main: '간식 ',
      sub: [
        '탕비실에 과자가 없다 채워달라',
        '과자는 사브레 초코크렘이 좋겠다',
        '사브레 초코크렘은 맛있다',
        '얼려먹으면 더 맛있다',
        '이상이다',
      ],
    },
    {
      main: '조직원 ',
      sub: [
        '괴롭힘을 당하고 있다',
        '신변보호를 요청한다',
        '괴롭히는 상대는 바로 김상사',
        '김상사 죽어',
        '이상이다',
      ],
    },
    {
      main: '조직원 ',
      sub: ['괴롭힘을 당하고 있다'],
    },
    {
      main: '조직원 ',
      sub: ['괴롭힘을 당하고 있다', '신변보호를 요청한다'],
    },
    {
      main: '내 옆자리 ',
      sub: [],
    },
    {
      main: '화장실  ',
      sub: [
        '괴롭힘을 당하고 있다',
        '신변보호를 요청한다',
        '괴롭히는 상대는 바로 김상사',
        '김상사 죽어',
        '이상이다',
      ],
    },
  ];
  const improvements = async () => {
    try {
      const response = await ManageAPI.improvements(String(user?.userId));
      setImprov(response);
    } catch (error: unknown) {
      console.error('개선사항 로딩 중 오류', error);
    }
  };

  useEffect(() => {
    if (user) {
      improvements();
    }
  }, [user]);
  return (
    <div className="bg-customPink px-4 sm:px-[50px]">
      <div className="flex justify-center items-center bg-white w-full p-4 md:p-10 min-h-[50vh]">
        <div className="max-w-[1200px] w-full">
          <div className="flex items-center justify-between p-4 border-b">
            <div className="font-bold text-xl md:text-3xl">개선 사항</div>
          </div>
          <div className="flex justify-center flex-col items-center ">
            <div className=" max-w-[1200px]">
              {!improv ? (
                <div className="m-6 mt-28 p-6 border rounded-lg max-h-[300px] h-full">
                  <div className="flex flex-col justify-center mb-8">
                    <div className="flex justify-center">
                      <RiMailSendFill size={32} />
                    </div>
                    <div className="my-2"> • 개선사항을 수집 중 입니다!</div>
                    <div className="my-2"> • 조금만 기다려주세요.</div>
                  </div>
                </div>
              ) : (
                <div className="mt-10 md:mt-28 max-w-[1200px] max-h-[600px] overflow-y-scroll grid grid-cols-1 gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-20">
                  {improv.map((category, index) => (
                    <div
                      key={index}
                      className="group relative p-6 border rounded-lg"
                    >
                      <div className="flex flex-col justify-between mb-8">
                        <div className="mb-10 flex justify-center">
                          <p className="md:text-2xl font-semibold">
                            {category.main}
                          </p>
                        </div>
                        {improv[index].sub.map((content, i) => (
                          <div key={i} className="text-xs md:text-base my-2">
                            • {content}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="mt-12 md:mt-24 min-h-60">
              <button className="w-full p-3 md:px-10 rounded-lg max-w-[270px] min-w-[50px] bg-[#757575] text-white text-sm md:text-base">
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
