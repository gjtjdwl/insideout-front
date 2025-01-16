'use client'

import { useRouter } from "next/navigation";
import React, { use } from "react";
import { FiChevronLeft } from 'react-icons/fi';

//params는 Promise로 래핑되었기 때문에, 비동기적으로 값을 처리
//React.use()로 params 언래핑
type Props = {
  params: Promise<{
    inquiryId: number
  }>;
}
const BoardDetail = ({ params }: Props) => {
  const router = useRouter();
  const { inquiryId } = use(params);

  const text = `최근 공공기관 근로자들 사이에서 직무 스트레스와 정신 건강 문제가 심각한 사회적 이슈로 대두되고 있습니다.
              특히, 공공 근로자들은 심리적 지원이 필요함에도 불구하고 시간적 여유와 상담에 대한 사회적 낙인으로 인해 전문가 상담을 받기 어려운 경우가 많습니다.
              이를 해결하기 위해, AI 기술을 활용하여 쉽고 안전하게 이용 가능한 심리 상담 플랫폼을 구축하려는 필요성이 제기되었습니다.

              InsideOut은 공공 근로자를 대상으로 하는 AI 기반 심리 상담 플랫폼으로, 개인화된 상담 서비스를 제공합니다.
              1. AI 상담 챗봇
              24/7 상담 가능: 근로자가 언제 어디서나 이용 가능.
              심리 분석: 언어 데이터와 감정 분석 기술을 통해 사용자의 심리 상태를 평가.
              스트레스 완화 코칭: 사용자의 감정 상태에 적합한 코칭 메시지 제공.
              2. 익명성 보장
              이용자의 개인 정보와 상담 기록을 철저히 보호하며, 익명 상담이 가능.
              공공 근로자들이 낙인 효과에 대한 우려 없이 서비스를 이용할 수 있도록 지원.
              맞춤형 프로그램 추천
              사용자의 상담 기록과 심리 상태를 기반으로 명상 프로그램, 마음챙김 훈련, 정신 건강 관련 자료 등을 제안.
              3. 전문가 연결 서비스
              필요 시 심리 전문가와의 화상 상담이나 전화 상담을 예약할 수 있도록 지원.
              AI가 초기 상담을 통해 우선순위를 분류하여 효율적 상담 진행

              InsideOut의 기대효과는 다음과 같습니다
              1) 공공 근로자의 정신 건강 개선
              상담 접근성을 높임으로써 스트레스와 번아웃 증상을 완화하고, 업무 효율성과 직무 만족도를 향상.
              2) 상담 서비스 비용 절감
              기존의 대면 상담 서비스보다 비용 효율적이며, 국가 차원에서 더 많은 근로자들에게 서비스를 제공 가능.
              3) 공무원 퇴사율 감소
              심리적 지원을 통해 근로자의 직업 유지율을 높이고 조직 안정성을 강화.
              4) 공공 정책 데이터 기반 강화
              익명 데이터를 기반으로 스트레스 요인 분석 및 정책 개선 자료로 활용 가능.
                InsideOut은 단순한 AI 상담 도구가 아니라, 공공 근로자들의 정신 건강을 전반적으로 개선하고, 사회적 비용을 줄이며,
                행복한 조직 문화를 형성하는 데 기여할 수 있는 혁신적인 솔루션입니다.
                공공의 행복과 조직의 안정성을 위해 InsideOut이 그 첫걸음을 내딛습니다.`
  return (
    <div className="p-5 w-full flex flex-col">
      <FiChevronLeft type='button' onClick={() => router.push('/boards/notice')} className="text-sm md:text-xl mb-4 md:mb-8 cursor-pointer" />
      <div className="flex flex-col">
        <div className="border-b w-full flex">
          <div className="max-w-[1000px] flex items-center justify-center p-4 text-base font-semibold md:text-2xl">
            Inside Out에서 제공하는 유용한 정보에 대해서 안내드립니다.
          </div>
        </div>
        <div className="flex justify-end p-4 mb-12 text-xs md:text-sm text-[#757575]">
          <span className="mr-2 ">관리자 </span>
          <span className='mr-2'>2024.11.12. 22:30 </span>
          <button
            type="submit"
            onClick={() => router.push(`/boards/notice/modify/${inquiryId}`)}
            className="mr-2 hover:text-[#757575]"
          >
            수정
          </button>
          <button
            type="submit"
            onClick={() => {}}
            className="hover:text-[#757575]"
          >
            삭제
          </button>
        </div>
        <div className="w-full p-4 max-w-[1440px] flex">
          <div className="whitespace-pre-line text-sm md:text-base">
            {text}
          </div>
        </div>
        
      </div>
    </div>
  );
};
export default BoardDetail