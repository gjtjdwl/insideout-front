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

  const summary = async () => {
    try {
      const res = await UserAPI.userSummary(String(user?.userId));
      const formatRes = res
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        .map(({ createdAt, summary, status, feedback, orsScore }) => ({
          createdAt: formatDateTimeSummary(createdAt),
          summary: summary || '내용 없음',
          status: status || 'NONE',
          feedback: feedback || '피드백 없음',
          orsScore: orsScore,
        }));
      setSummaryList(formatRes);

      const dates = res
        .sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        )
        .slice(-7) //최신 7개만
        .map(({ createdAt, orsScore }) => ({
          date: formatDateTimeSummaryChart(createdAt),
          orsScore: Number(orsScore),
        }));

      setOrsScore(dates);
      setLoading(false);
    } catch (error: unknown) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      summary();
    }
  }, [user]);

  return (
    <div className="bg-customPink px-4 sm:px-[50px]">
      <div className="bg-white py-8 sm:py-12 lg:py-16 min-h-[70vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="relative flex items-center mb-8">
            <button
              onClick={() => router.back()}
              className="absolute left-0 p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <FiChevronLeft className="text-2xl text-gray-600" />
            </button>
            <h1 className="w-full text-center text-2xl sm:text-3xl font-bold text-gray-900">
              상담 결과
            </h1>
          </div>

          <div className="space-y-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 px-2">
              {user?.name}님의 상담 결과
            </h2>

            {summaryList.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="text-gray-500 text-lg">
                  상담 이력이 존재하지 않습니다.
                </div>
              </div>
            ) : (
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Chart Section */}
                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                  <h3 className="text-lg font-medium text-gray-700 mb-4">
                    ORS 점수 추이
                  </h3>
                  {!loading && (
                    <ResponsiveContainer width="100%" height={400}>
                      <LineChart data={orsScore}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <Line
                          type="monotone"
                          dataKey="orsScore"
                          stroke="#6366f1"
                          strokeWidth={2}
                          dot={{ fill: '#6366f1', strokeWidth: 2 }}
                          name="ORS 점수"
                        />
                        <XAxis
                          dataKey="date"
                          angle={-20}
                          textAnchor="end"
                          tick={{ fontSize: 12, fill: '#666' }}
                          padding={{ left: 20, right: 20 }}
                        />
                        <YAxis
                          domain={[0, 40]}
                          tick={{ fontSize: 12, fill: '#666' }}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'white',
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                          }}
                        />
                        <Legend
                          wrapperStyle={{
                            paddingTop: '20px',
                            fontSize: '14px',
                          }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  )}
                </div>

                {/* Summary List Section */}
                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                  <h3 className="text-lg font-medium text-gray-700 mb-4">
                    상담 내역
                  </h3>
                  <div className="overflow-y-auto max-h-[600px] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                    <div className="space-y-4">
                      {summaryList.map((item, index) => (
                        <Accordion
                          key={index}
                          header={item.createdAt}
                          text={item.summary}
                          feedback={item.feedback ?? '피드백 없음'}
                          status={item.status ?? 'NONE'}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
