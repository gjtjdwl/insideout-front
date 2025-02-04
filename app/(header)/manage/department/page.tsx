'use client';

import DepartmentCard from '@/app/components/DepartmentCard';
import { ManageAPI } from '@/app/api';
import { useEffect, useMemo, useState } from 'react';
import { useUser } from '@/app/hooks/useUser';
import {
  diffData,
  MemberData,
  PageMemberData,
  statisticData,
} from '@/app/types/manage';
import { formatDateTimeDepart } from '@/app/utils/dataFormatter';
import RenderLineChart from '@/app/components/ReCharts';
import SearchInput from '@/app/components/SearchInput';
import PaginationComponent from '@/app/components/PagenationComponent';

export default function managerAdminPage() {
  const route = `/manage/accepted`;
  const { user } = useUser();
  const [memberList, setMemberList] = useState<MemberData[]>([]);
  const [orsList, setOrsList] = useState<statisticData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [latest, setLatest] = useState<diffData>();
  const [searchValue, setSearchValue] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageList, setPageList] = useState<PageMemberData>();
  // ORSdata load
  const orsStats = async () => {
    try {
      const response = await ManageAPI.statsORS(String(user?.userId));

      const dates = Object.entries(response.weeklyStatistics)
        .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
        .map(([date, { average, variance }]) => ({
          date,
          average: Number(average.toFixed(2)),
          variance: Number(variance.toFixed(2)),
        }));

      setOrsList(dates);
      const latest = dates[dates.length - 1];
      const lastweek = dates[dates.length - 2];

      const stats = {
        latest,
        averageDiff:
          Math.round((latest?.average - lastweek?.average) * 100) / 100,
        varianceDiff:
          Math.round((latest?.variance - lastweek?.variance) * 100) / 100,
      };

      setLatest(stats);
    } catch (error: unknown) {
      console.error('ORS통계 불러오는 중 오류 발생', error);
    }
  };

  const member = async (keyword: string, page: number) => {
    try {
      const response = await ManageAPI.departmentUser(
        String(user?.userId),
        keyword,
        page
      );
      setMemberList(response.content);
      setPageList(response);
    } catch (error: unknown) {
      console.error('부서원 불러오는 중 오류 발생', error);
    }
  };
  useEffect(() => {
    member(searchValue, currentPage);
  }, [searchValue, currentPage]);

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
          await member(searchValue, currentPage);
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
                              {latest?.latest.date &&
                                formatDateTimeDepart(latest.latest.date)}
                            </td>
                            <td className="m-4 p-5">
                              {latest?.latest.average}
                            </td>
                            <td className="m-4 p-5">
                              {latest?.latest.variance}
                            </td>
                          </tr>
                          <tr>
                            <td>지난 주 대비</td>
                            <td
                              className={
                                latest?.averageDiff && latest.averageDiff > 0
                                  ? 'text-red-400'
                                  : 'text-blue-500'
                              }
                            >
                              {latest?.averageDiff && latest.averageDiff > 0
                                ? '+' + latest?.averageDiff
                                : latest?.averageDiff}
                            </td>
                            <td
                              className={
                                latest?.varianceDiff && latest.varianceDiff > 0
                                  ? 'text-red-400'
                                  : 'text-blue-500'
                              }
                            >
                              {latest?.varianceDiff}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between mt-12 md:mt-24">
                <div className="font-medium md:text-2xl">부서원</div>
                <div className="">
                  <SearchInput
                    searchValue={searchValue}
                    onChange={setSearchValue}
                    onClear={handleClear}
                    onKeyDown={handleKeyPress}
                  />
                </div>
              </div>
              {memberList.length === 0 ? (
                <div className="mt-9 min-h-[30vh] text-[#757575]">
                  부서원이 없습니다.
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-x-2 gap-y-2 sm:gap-x-6 sm:gap-y-5 mt-9">
                    {memberList.map((person) => (
                      <DepartmentCard
                        key={person.userId}
                        route={route}
                        name={person.name}
                        id={person.userId}
                      />
                    ))}
                  </div>
                  <div className="mt-10">
                    <PaginationComponent
                      currentPage={currentPage}
                      onChangePage={setCurrentPage}
                      totalPages={Number(pageList?.totalPages)}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
