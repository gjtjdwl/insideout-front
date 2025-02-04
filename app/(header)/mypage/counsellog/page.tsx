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

export default function CounselLogPage() {
  const { user } = useUser();
  const [loading, setLoading] = useState<boolean>(true);
  const [summaryList, setSummaryList] = useState<counsellog[]>([]);
  const [orsScore, setOrsScore] = useState<
    { date: string; orsScore: number }[]
  >([]);

  const summary = async () => {
    const res = await UserAPI.userSummary(String(user?.userId));

    console.log(res);
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
          <div className="flex  justify-center items-center px-4 sm:px-0">
            <h3 className="text-xl md:text-3xl mb-3 leading-loose font-semibold text-gray-900">
              상담 결과
            </h3>
          </div>

          <hr className="md:mb-12" />
          <div className="flex flex-col justify-start p-4">
            <div className="text-lg md:text-2xl mx-4">
              {user?.name}님의 상담 결과
            </div>
            <div className="my-10 grid md:justify-center sm:grid-cols-2 gap-10 sm:mt-10">
              <div className="flex flex-col items-end">
                {loading && (
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={orsScore}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <Line
                        dataKey="orsScore"
                        stroke="#82ca9d"
                      />
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
              <div className=" overflow-y-scroll max-h-[400px]">
                <div className="flex flex-col justify-center items-cneter">
                  {summaryList.map((items, index) => (
                    <Accordion
                      key={index}
                      header={items.createdAt}
                      text={items.summary ? items.summary : '내용 없음'}
                    />
                  ))}
                  {/* <button className=" bg-customPink text-black font-bold py-2 rounded-lg hover:bg-customPinkHover focus:outline-none">
                  더보기
                </button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
