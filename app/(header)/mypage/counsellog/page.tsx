'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Accordion from '@/app/components/Accordion';

export default function CounselLogPage() {
  return (
    <div className="bg-customPink px-4 sm:px-[50px]">
      <div className=" bg-white py-16 flex justify-center min-h-[70vh]">
        <div className="max-w-[1200px] w-full">
          <div className="flex  justify-center items-center px-4 sm:px-0">
            <h3 className="text-xl md:text-3xl leading-loose font-medium text-gray-900">
              상담 결과
            </h3>
          </div>

          <hr className="md:mb-12" />
          <div className='flex flex-col justify-start p-8'>
            <div className="text-lg md:text-2xl ">허성지님의 상담 결과</div>
            <div className="grid justify-center md:grid-cols-2 gap-4">
              <div className='mb-8'>
                <Image
                  src="/graph.png"
                  alt="그래프 들어갈 자리"
                  width={500}
                  height={300}
                  style={{ height: '330px' }}
                  className=""
                />
                <div className="text-lg md:text-2xl">변동량 : + 500%</div>
              </div>
              <div className="flex flex-col justify-center items-cneter">
                <Accordion
                  header="25년 1월 15일 상담"
                  text="괜찮아 보입니다. 우울한 감정은 보이지 않습니다. 다만 이 프로젝트에 대한 짜증이 많은 것 같습니다. 짜증나!
                    현재 아무것도 하고 싶지 않은 상태라니, 많이 힘드셨을 것 같아요. 지금은 작은 것부터 시작해보는 게 중요합니다. 
                    예를 들어, 하루에 5분 정도 좋아하는 음악을 듣거나, 창밖을 바라보며 숨을 깊게 쉬어보세요. 
                    작은 성취감이 쌓이면 조금씩 동기부여가 생길 수 있습니다.

                    개선사항으로 이러쿵저러쿵이 전달 되었습니다."
                />
                <Accordion
                  header="24년 12월 24일 상담"
                  text="조금 우울합니다. 회사 생활이 그리 달갑지 않은 것 같습니다. 그럴 땐 어떻게 하는게 좋을까요? 저는 이 대답을 말 할 수 없어요.
              저는 AI니까요. 감정이 없습니다. 당신은 감정이 있어 보이시는군요. 이럴 때야 말로 당신의 조언이 필요한 때가 아닐까요?"
                />
                <Accordion
                  header="24년 11월 11일 상담"
                  text="켜졌어 Red Light
                  (Ay Wait a minute 정글 속의 룰 따라 약한 자는 먹혀)
                  선명한 Red Light
                  스스로 켜져 그것은 Red Light
                  (앞으로만 밀어대니 Yeah 밀어대니 Nah 아차 하면 밟혀)

                  켜졌어 Red Light
                  (캐터필러 캐터필러 앞에 모두 다 침몰할 때)
                  두 개의 Red Light
                  (켜진거야 켜진거야)
                  붉은 태양과 네 앞에 Red Light"
                />

                <button className=" bg-customPink text-black font-bold py-2 rounded-lg hover:bg-customPinkHover focus:outline-none">
                  더보기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
