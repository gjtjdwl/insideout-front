'use client';
import React, { useEffect, useState } from 'react';
import Accordion from '@/app/components/Accordion';
import { useUser } from '@/app/hooks/useUser';
import { UserAPI } from '@/app/api';
import { counsellog } from '@/app/types/mypage';
import {
  formatDateTimeSummary,
  formatDateTimeSummaryChart,
} from '@/app/utils/dataFormatter';
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
} from 'recharts';
import { FiChevronLeft } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

export default function CounselLogPage() {
  const { user } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [summaryList, setSummaryList] = useState<counsellog[]>([]);
  const [orsScore, setOrsScore] = useState<
    { date: string; orsScore: number }[]
  >([]);

  const mo = [
    {
      "createdAt" : "2025-01-31",
      "status": "STABLE",
      "summary": "[요약]  \n현재 사용자는 삶에 대한 전반적인 무력감과 소외감을 느끼고 있는 것으로 보입니다. 업무 환경에서의 소외된 경험과 사회적 관계에서의 부재는 본인의 존재 가치에 대한 의문을 증폭시키고 있습니다. 이러한 감정은 자신을 자책하는 생각으로 이어지고 있으며, 이는 사용자의 자존감을 심각하게 훼손할 수 있습니다. 특히, 팀 내에서의 배제 경험은 사용자에게 큰 상처가 되었고, 이로 인해 자신이 쓸모없다는 생각을 하게 되었습니다. 이러한 감정의 고조와 자기 비난은 사용자의 정신 건강에 부정적인 영향을 미칠 수 있어 주의가 필요합니다.\n\n[제안]  \n먼저, 사용자가 느끼는 감정을 인정하고 이해하려는 노력이 필요합니다. 자신의 감정을 표현하는 것만으로도 큰 위안을 얻을 수 있습니다. 업무 환경에서는 소외감을 줄이기 위해 작은 목표를 세우고 이를 하나씩 성취함으로써 자신감을 회복하는 것이 중요합니다. 팀원들과의 소통을 조금씩 시도해보며 관계를 개선해 나가는 것도 좋은 방법이 될 수 있습니다. 또한, 자신의 가치와 장점을 재발견할 수 있도록 자기 반성보다는 긍정적인 자기 평가를 시도해 보세요. 필요하다면 전문가의 도움을 받아 심리 상담을 진행하며 자신의 감정을 관리하는 것도 추천드립니다. 무엇보다도, 당신은 혼자가 아니며, 필요한 도움을 요청할 권리가 있음을 기억하세요.",
      "feedback": "[개선사항]  \n• 부서 내 소통 강화  \n• 업무 배분 개선  "
    },
    {
      "createdAt" : "2025-01-31",
      "status": "STABLE",
      "summary": "[요약]  \n현재 사용자는 삶에 대한 전반적인 무력감과 소외감을 느끼고 있는 것으로 보입니다. 업무 환경에서의 소외된 경험과 사회적 관계에서의 부재는 본인의 존재 가치에 대한 의문을 증폭시키고 있습니다. 이러한 감정은 자신을 자책하는 생각으로 이어지고 있으며, 이는 사용자의 자존감을 심각하게 훼손할 수 있습니다. 특히, 팀 내에서의 배제 경험은 사용자에게 큰 상처가 되었고, 이로 인해 자신이 쓸모없다는 생각을 하게 되었습니다. 이러한 감정의 고조와 자기 비난은 사용자의 정신 건강에 부정적인 영향을 미칠 수 있어 주의가 필요합니다.\n\n[제안]  \n먼저, 사용자가 느끼는 감정을 인정하고 이해하려는 노력이 필요합니다. 자신의 감정을 표현하는 것만으로도 큰 위안을 얻을 수 있습니다. 업무 환경에서는 소외감을 줄이기 위해 작은 목표를 세우고 이를 하나씩 성취함으로써 자신감을 회복하는 것이 중요합니다. 팀원들과의 소통을 조금씩 시도해보며 관계를 개선해 나가는 것도 좋은 방법이 될 수 있습니다. 또한, 자신의 가치와 장점을 재발견할 수 있도록 자기 반성보다는 긍정적인 자기 평가를 시도해 보세요. 필요하다면 전문가의 도움을 받아 심리 상담을 진행하며 자신의 감정을 관리하는 것도 추천드립니다. 무엇보다도, 당신은 혼자가 아니며, 필요한 도움을 요청할 권리가 있음을 기억하세요.",
      "feedback": "[개선사항]  \n• 부서 내 소통 강화  \n• 업무 배분 개선  "
    },
    {
      "createdAt" : "2025-01-31",
      "status": "STABLE",
      "summary": "[요약]  \n현재 사용자는 삶에 대한 전반적인 무력감과 소외감을 느끼고 있는 것으로 보입니다. 업무 환경에서의 소외된 경험과 사회적 관계에서의 부재는 본인의 존재 가치에 대한 의문을 증폭시키고 있습니다. 이러한 감정은 자신을 자책하는 생각으로 이어지고 있으며, 이는 사용자의 자존감을 심각하게 훼손할 수 있습니다. 특히, 팀 내에서의 배제 경험은 사용자에게 큰 상처가 되었고, 이로 인해 자신이 쓸모없다는 생각을 하게 되었습니다. 이러한 감정의 고조와 자기 비난은 사용자의 정신 건강에 부정적인 영향을 미칠 수 있어 주의가 필요합니다.\n\n[제안]  \n먼저, 사용자가 느끼는 감정을 인정하고 이해하려는 노력이 필요합니다. 자신의 감정을 표현하는 것만으로도 큰 위안을 얻을 수 있습니다. 업무 환경에서는 소외감을 줄이기 위해 작은 목표를 세우고 이를 하나씩 성취함으로써 자신감을 회복하는 것이 중요합니다. 팀원들과의 소통을 조금씩 시도해보며 관계를 개선해 나가는 것도 좋은 방법이 될 수 있습니다. 또한, 자신의 가치와 장점을 재발견할 수 있도록 자기 반성보다는 긍정적인 자기 평가를 시도해 보세요. 필요하다면 전문가의 도움을 받아 심리 상담을 진행하며 자신의 감정을 관리하는 것도 추천드립니다. 무엇보다도, 당신은 혼자가 아니며, 필요한 도움을 요청할 권리가 있음을 기억하세요.",
      "feedback": "[개선사항]  \n• 부서 내 소통 강화  \n• 업무 배분 개선  "
    }
  ]
  const summary = async () => {
    const res = await UserAPI.userSummary(String(user?.userId));
    const formatRes = res
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .map(({ createdAt, summary, status, feedback, orsScore }) => ({
        createdAt: formatDateTimeSummary(createdAt),
        summary: String(summary),
        status: status,
        feedback: feedback,
        orsScore: orsScore,
      }));
    console.log(formatRes);
    setSummaryList(formatRes);
    const dates = res
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      )
      .slice(-7) //최신 7개만
      .map(({ createdAt, orsScore }) => ({
        date: formatDateTimeSummaryChart(createdAt),
        orsScore: Number(orsScore), // 숫자로 변환 (필요할 경우)
      }));

    setOrsScore(dates);
    try {
    } catch (error: unknown) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (user) {
      summary();
    }
  }, [user]);

  return (
    <div className="bg-customPink px-4 sm:px-[50px]">
      <div className=" bg-white py-16 flex justify-center min-h-[70vh]">
        <div className="max-w-[1200px] w-full">
          <div className="flex relative  justify-center items-center px-4 sm:px-0">
              <FiChevronLeft
                type="button"
                cursor={'pointer'}
                onClick={() => router.back()}
                className=" absolute left-3 text-2xl md:text-[35px] mb-1 mr-3 text-gray-600 hover:text-gray-900"
              />
            <div className="flex justify-center w-full text-xl md:text-3xl mb-3 leading-loose font-semibold text-gray-900">
              상담 결과
            </div>
          </div>

          <hr className="md:mb-12" />
          <div className="flex flex-col justify-start p-4">
            <div className="text-lg md:text-2xl mx-4">
              {user?.name}님의 상담 결과
            </div>
            <div className="my-10 grid md:justify-center sm:grid-cols-2 gap-10 sm:mt-10">
              {summaryList.length === 0 ? (
                <div className="mx-4"> 상담 이력이 존재하지 않습니다. </div>
              ) : (
                <>
                  <div className="flex flex-col items-end">
                    {loading && (
                      <ResponsiveContainer width="100%" height={400}>
                        <LineChart data={orsScore}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <Line dataKey="orsScore" stroke="#82ca9d" />
                          <XAxis
                            dataKey="date"
                            angle={-20}
                            textAnchor="end"
                            padding={{ left: 20, right: 20 }}
                            style={{ fontSize: '10px' }}
                          />
                          <YAxis style={{ fontSize: '13px' }} />
                          <Tooltip />
                          <Legend wrapperStyle={{ paddingTop: '20px' }} />
                        </LineChart>
                      </ResponsiveContainer>
                    )}
                  </div>
                  <div className=" overflow-y-scroll max-h-[1000px]">
                    <div className="flex flex-col justify-center items-cneter">
                      {mo.map((items, index) => (
                        <Accordion
                          key={index}
                          header={items.createdAt}
                          text={items.summary ? items.summary : '내용 없음'}
                          feedback={items.feedback}
                          status={items.status}
                        />
                      ))}
                      {/* <button className=" bg-customPink text-black font-bold py-2 rounded-lg hover:bg-customPinkHover focus:outline-none">
                  더보기
                  </button> */}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
