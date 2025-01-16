'use client';
import React, { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

interface AccordionItemProps {
  header: string;
  text: string;
}

const Accordion = () => {
  return (
    <div className="bg-customPink">
      <div className=" bg-white mx-[50px] px-44 py-16">
        <div className="flex justify-center items-center px-4 sm:px-0">
          <h3 className="text-4xl leading-loose font-medium text-gray-900">
            상담 결과
          </h3>
        </div>

        <hr className="mb-12" />
        <div className="text-2xl pl-20 mb-10">허성지님의 상담 결과</div>
        <div className="flex justify-center items-center">
          <div>
            <Image
              src="/graph.png"
              alt="그래프 들어갈 자리"
              width={500}
              height={300}
              style={{ height: '330px' }}
              className="mr-20"
            />
          </div>
          <div className="flex flex-col justify-center items-cneter w-[50%] pl-8 ml-8 mt-8">
            <AccordionItem
              header="25년 1월 15일 상담"
              text="괜찮아 보입니다. 우울한 감정은 보이지 않습니다. 다만 이 프로젝트에 대한 짜증이 많은 것 같습니다. 짜증나!
                    현재 아무것도 하고 싶지 않은 상태라니, 많이 힘드셨을 것 같아요. 지금은 작은 것부터 시작해보는 게 중요합니다. 
                    예를 들어, 하루에 5분 정도 좋아하는 음악을 듣거나, 창밖을 바라보며 숨을 깊게 쉬어보세요. 
                    작은 성취감이 쌓이면 조금씩 동기부여가 생길 수 있습니다.

                    개선사항으로 이러쿵저러쿵이 전달 되었습니다."
            />
            <AccordionItem
              header="24년 12월 24일 상담"
              text="조금 우울합니다. 회사 생활이 그리 달갑지 않은 것 같습니다. 그럴 땐 어떻게 하는게 좋을까요? 저는 이 대답을 말 할 수 없어요.
              저는 AI니까요. 감정이 없습니다. 당신은 감정이 있어 보이시는군요. 이럴 때야 말로 당신의 조언이 필요한 때가 아닐까요?"
            />
            <AccordionItem
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
        <div className="text-2xl pl-20 pt-10">변동량 : + 500%</div>
      </div>
    </div>
  );
};

export default Accordion;

const AccordionItem: React.FC<AccordionItemProps> = ({ header, text }) => {
  const [active, setActive] = useState<boolean>(false);

  const handleToggle = () => {
    setActive(!active);
  };

  return (
    <div
      className={`mb-8 rounded-lg p-4 ${active ? 'bg-customPink' : 'bg-gray-200'}`}
    >
      <button
        className={`faq-btn flex w-full text-left`}
        onClick={() => handleToggle()}
      >
        <div className="w-full">
          <h4 className="mt-1 text-lg font-semibold text-dark dark:text-white">
            {header}
          </h4>
        </div>

        <div className="mr-5 flex h-10 w-full max-w-[40px] items-center justify-center rounded-lg bg-primary/5 text-primary dark:bg-white/5">
          <ChevronDownIcon
            className={`fill-primary stroke-primary duration-200 ease-in-out ${
              active ? 'rotate-180' : ''
            }`}
          />
        </div>
      </button>

      <div
        className={`px-[32px] duration-200 ease-in-out ${
          active ? 'block' : 'hidden'
        }`}
      >
        <p className="py-3 text-base leading-relaxed text-body-color dark:text-dark-6">
          {text}
        </p>
      </div>
    </div>
  );
};
{
  /*https://tailgrids.com/react/components/accordions*/
}
