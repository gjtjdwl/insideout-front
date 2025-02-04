'use client';

import DepartmentCard from '@/app/components/DepartmentCard';
import { webManageAPI } from '@/app/api';
import { useEffect, useMemo, useState } from 'react';
import {
  departmentData,
  PagedepartmentData,
  weeklyData,
} from '@/app/types/webManage';
import {
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  Line,
  ResponsiveContainer,
} from 'recharts';
import SearchInput from '@/app/components/SearchInput';
import { formatDateTimeDepart } from '@/app/utils/dataFormatter';
import PageLoader from 'next/dist/client/page-loader';
import PaginationComponent from '@/app/components/PagenationComponent';
function dateFormat(date: string): string {
  let originDate = new Date(date);
  let formatDate =
    originDate.getMonth() + 1 + '월 ' + originDate.getDate() + '일';
  return formatDate;
}
interface SRSType {
  date: string;
  average: number;
  variance: number;
}
interface diffsType {
  latest: SRSType;
  averageDiff: number;
  varianceDiff: number;
}

export default function webAdminPage() {
  const [loading, setLoading] = useState(true);
  const [departments, setDepartments] = useState<departmentData[]>([]);
  const [SRS, setSRS] = useState<SRSType[]>([]);
  const [stats, setStats] = useState<diffsType>();
  const [searchValue, setSearchValue] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageList, setPageList] = useState<PagedepartmentData>();

  const department = async (page: number = 0) => {
    const dept = await webManageAPI.departments(page);
    setDepartments(dept.content);
    setPageList(dept);
  };
  useEffect(() => {
    department(currentPage);
  }, [currentPage]);

  const handleClear = () => {
    setSearchValue('');
  };
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
    }
  };
  useEffect(() => {
    const handleLoad = async () => {
      try {
        const res = await webManageAPI.SRS();
        const SRS = Object.entries(res.weeklyStatistics)
          .sort(
            ([dateA], [dateB]) =>
              new Date(dateA).getTime() - new Date(dateB).getTime()
          )
          .map(([date, { average, variance }]) => ({
            date,
            average: Math.round(average * 100) / 100,
            variance: Math.round(variance * 100) / 100,
          }));
        setSRS(SRS);

        const latest = SRS[SRS.length - 1];
        const lastWeek = SRS[SRS.length - 2];
        const stats = {
          latest: latest,
          averageDiff:
            Math.round((latest?.average - lastWeek?.average) * 100) / 100,
          varianceDiff:
            Math.round((latest?.variance - lastWeek?.variance) * 100) / 100,
        };
        setStats(stats);
      } catch (error: unknown) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    department();
    handleLoad();
  }, []);
  return (
    <>
      <div className="bg-customPink px-4 sm:px-[50px]">
        <div className="items-center flex justify-center bg-white w-full p-10">
          <div className="max-w-[1200px] w-full">
            <div className="flex items-center justify-between md:p-4 border-b">
              <div className="font-bold text-xl md:text-3xl">사이트 관리</div>
            </div>
            <div className="md:m-10">
              <div className="mt-4 md:mt-16 font-mediumt md:text-2xl">
                사이트 통계
              </div>
              <div className="md:grid md:grid-cols-2 gap-x-16 justify-center">
                <div className="flex flex-col items-end my-10">
                  {!loading && (
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={SRS}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          dataKey="date"
                          angle={-30}
                          textAnchor="end"
                          interval={0}
                        />
                        <YAxis />
                        <Tooltip />
                        <Legend wrapperStyle={{ paddingTop: '40px' }} />
                        <Line dataKey="average" stroke="#FF5858" />
                        <Line dataKey="variance" stroke="#279EFF" />
                      </LineChart>
                    </ResponsiveContainer>
                  )}
                </div>
                <div className="flex flex-col text-center">
                  <div className="p-3 md:p-8 md:my-10  border border-[#525252] h-[80%] flex flex-col justify-center">
                    <div className="sm:text-2xl">SRS 점수</div>
                    <table className="border-none mt-10 sm:text-2xl">
                      <tbody>
                        <tr className="m-2">
                          <td></td>
                          <td>평균</td>
                          <td>분산</td>
                        </tr>
                        <tr>
                          <td className="m-4">
                            {stats?.latest.date &&
                              formatDateTimeDepart(stats.latest.date)}
                          </td>
                          <td className="m-4 p-5">{stats?.latest.average}</td>
                          <td className="m-4 p-5">{stats?.latest.variance}</td>
                        </tr>
                        <tr>
                          <td>지난 주 대비</td>
                          <td
                            className={
                              stats?.averageDiff && stats.averageDiff > 0
                                ? 'text-red-400'
                                : 'text-blue-500'
                            }
                          >
                            {stats?.averageDiff && stats.averageDiff > 0
                              ? '+' + stats?.averageDiff
                              : stats?.averageDiff}
                          </td>
                          <td
                            className={
                              stats?.varianceDiff && stats.varianceDiff > 0
                                ? 'text-red-400'
                                : 'text-blue-500'
                            }
                          >
                            {stats?.varianceDiff}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between mt-12 md:mt-24">
              <div className="font-medium md:text-2xl">부서</div>
              <div className="">
                <SearchInput
                  searchValue={searchValue}
                  onChange={setSearchValue}
                  onClear={handleClear}
                  onKeyDown={handleKeyPress}
                />
              </div>
            </div>
            <ul className="grid grid-cols-2 sm:grid-cols-1 gap-x-2 gap-y-2 sm:gap-x-6 sm:gap-y-5 mt-9">
              {departments.map((department, index) => {
                let route =
                  '/admin/web/department/' + department.departmentName;
                return (
                  <li key={index} className="sm:my-2">
                    <DepartmentCard
                      route={route}
                      name={department.departmentName}
                      id={department.managerName}
                    />
                  </li>
                );
              })}
            </ul>
            <div className="mt-10">
              <PaginationComponent
                currentPage={currentPage}
                onChangePage={setCurrentPage}
                totalPages={Number(pageList?.totalPages)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
