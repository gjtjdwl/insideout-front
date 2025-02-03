'use client';

import dynamic from 'next/dynamic';
import DepartmentCard from '@/app/components/DepartmentCard';
import { ManageAPI } from '@/app/api';
import { useEffect, useMemo, useState } from 'react';
import { useUser } from '@/app/hooks/useUser';
import { MemberData, statisticData } from '@/app/types/manage';
import { formatDateTimeDepart } from '@/app/utils/dataFormatter';
import RenderLineChart from '@/app/components/ReCharts';
import SearchInput from '@/app/components/SearchInput';

export default function managerAdminPage() {
  const route = `/manage/accepted/`;
  const { user } = useUser();
  const [memberList, setMemberList] = useState<MemberData[]>([]);
  const [orsList, setOrsList] = useState<statisticData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [latest, setLatest] = useState<statisticData>();
  const [searchValue, setSearchValue] = useState<string>('');
  // ORSdata load
  const orsStats = async () => {
    try {
      const response = await ManageAPI.statsORS(String(user?.userId));
      const dates = Object.keys(response.weeklyStatistics).sort(
        (a, b) => new Date(a).getTime() - new Date(b).getTime()
      );
      const formatList = dates.map((date, index) => {
        const current = response.weeklyStatistics[date];
        const prev = dates[index - 1]
          ? response.weeklyStatistics[dates[index - 1]]
          : null;

        //지난주 평균, 분산
        const prevAvg = prev ? prev.average : current.average;
        const prevVariance = prev ? prev.variance : current.variance;
        const constrastAvg = (current.average - prevAvg).toFixed(2);
        const constrastVariance = (current.variance - prevVariance).toFixed(2);

        // 양수일 경우 앞에 "+" 붙이기
        const formattedConstrastAvg =
          Number(constrastAvg) >= 0 ? `+${constrastAvg}` : constrastAvg;
        const formattedConstrastVariance =
          Number(constrastVariance) >= 0
            ? `+${constrastVariance}`
            : constrastVariance;

        return {
          date: date,
          average: Number(current.average.toFixed(2)),
          variance: Number(current.variance.toFixed(2)),
          constrastAvg: formattedConstrastAvg,
          constrastVariance: formattedConstrastVariance,
        };
      });
      setOrsList(formatList);
      setLatest(formatList[formatList.length - 1]);
    } catch (error: unknown) {
      console.error('ORS통계 불러오는 중 오류 발생', error);
    }
  };

  const member = async () => {
    try {
      const response = await ManageAPI.departmentUser(String(user?.userId));
      setMemberList(response);
    } catch (error: unknown) {
      console.error('부서원 불러오는 중 오류 발생', error);
    }
  };

  const filteredNoticeList = useMemo(() => {
    return memberList.filter(
      (mem) =>
        mem.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        mem.userId.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [searchValue, memberList]);

  const handleClear = () => {
    setSearchValue('');
  };
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
    }
  };
  useEffect(() => {
    if (user) {
      const handleLoad = async () => {
        try {
          await orsStats();
          await member();
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };

      handleLoad();
    }
  }, [user]);

  return (
    <>
      <div className="bg-customPink px-4 sm:px-[50px]">
        <div className="items-center flex justify-center bg-white w-full p-10">
          <div className="max-w-[1200px] w-full">
            <div className="flex items-center justify-between md:p-4 border-b">
              <div className="font-bold text-lg md:text-3xl">부서 관리</div>
            </div>
            <div className="md:m-10">
              <div className="mt-4 md:mt-16 font-medium md:text-2xl">
                부서 통계
              </div>
              <div className="md:grid md:grid-cols-2 gap-x-8 justify-center">
                <div className="flex flex-col items-end my-10">
                  {!loading && <RenderLineChart data={orsList} />}
                </div>
                <div className="flex flex-col text-center items-center">
                  <div className="p-3 md:p-8 md:my-10 border border-[#525252] w-full max-w-[430px] md:h-[100%] flex flex-col justify-center">
                    <div className="sm:text-2xl">ORS 점수</div>
                    {orsList && (
                      <table className="border-none mt-10 sm:text-2xl">
                        <tbody>
                          <tr className="m-2">
                            <td></td>
                            <td>평균</td>
                            <td>분산</td>
                          </tr>
                          <tr>
                            <td className="m-4">
                              {latest?.date &&
                                formatDateTimeDepart(latest.date)}
                            </td>
                            <td className="m-4 p-5">{latest?.average}</td>
                            <td className="m-4 p-5">{latest?.variance}</td>
                          </tr>
                          <tr>
                            <td>지난 주 대비</td>
                            <td
                              className={
                                latest?.constrastAvg &&
                                Number(latest.constrastAvg) > 0
                                  ? 'text-red-400'
                                  : 'text-blue-500'
                              }
                            >
                              {latest?.constrastAvg}
                            </td>
                            <td
                              className={
                                latest?.constrastVariance &&
                                Number(latest.constrastVariance) > 0
                                  ? 'text-red-400'
                                  : 'text-blue-500'
                              }
                            >
                              {latest?.constrastVariance}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              </div>
              <div className='flex items-center justify-between mt-12 md:mt-24'>
                <div className="font-medium md:text-2xl">
                  부서원
                </div>
                <div className="">
                  <SearchInput
                    searchValue={searchValue}
                    onChange={setSearchValue}
                    onClear={handleClear}
                    onKeyDown={handleKeyPress}
                  />
                </div>
              </div>
              {filteredNoticeList.length === 0 ? (
                <div className="mt-9 min-h-[30vh] text-[#757575]">부서원이 없습니다.</div>
              ) : (
                <div className="grid grid-cols-2 gap-x-2 gap-y-2 sm:gap-x-6 sm:gap-y-5 mt-9">
                  {filteredNoticeList.map((person) => (
                    <DepartmentCard
                      key={person.userId}
                      route={`${route}${person.userId}`}
                      name={person.name}
                      id={person.userId}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
