'use client';

import DepartmentCard from '@/app/components/DepartmentCard';
import { webManageAPI } from '@/app/api';
import { useEffect, useState } from 'react';
import { departmentData, weeklyData } from '@/app/types/webManage';
import {
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  Line,
} from 'recharts';
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

  useEffect(() => {
    const handleLoad = async () => {
      try {
        const dept = await webManageAPI.departments();
        setDepartments(dept);

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
    handleLoad();
  }, []);
  return (
    <>
      <div className="bg-customPink px-4 sm:px-[50px]">
        <div className="items-center flex justify-center bg-white w-full p-10">
          <div className="max-w-[1200px] w-full">
            <div className="flex items-center justify-between p-4 border-b">
              <div className="font-bold text-xl md:text-3xl">사이트 관리</div>
            </div>
            <div className="m-10">
              <div className="mt-16 font-mediumt text-lg md:text-2xl">
                사이트 통계
              </div>
              <div className="grid grid-flow-col gap-x-16 justify-center">
                <div className="p-10">
                  {!loading && (
                    <LineChart width={600} height={350} data={SRS}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line dataKey="average" stroke="#FF5858" />
                      <Line dataKey="variance" stroke="#279EFF" />
                    </LineChart>
                  )}
                </div>
                <div className="flex flex-col text-center w-[400px] h-[350px] my-auto">
                  <div className="p-6 border border-[#525252] h-[80%] flex flex-col justify-center">
                    <div className="text-base md:text-2xl">SRS 점수</div>
                    <table className="border-none mt-10 text-2xl">
                      <tbody>
                        <tr className="m-2">
                          <td></td>
                          <td>평균</td>
                          <td>분산</td>
                        </tr>
                        <tr>
                          <td className="m-4">
                            {stats?.latest.date &&
                              dateFormat(stats.latest.date)}
                          </td>
                          <td className="m-4 p-5">{stats?.latest.average}</td>
                          <td className="m-4 p-5">{stats?.latest.variance}</td>
                        </tr>
                        <tr>
                          <td>지난 주 대비</td>
                          <td
                            className={
                              stats?.averageDiff && stats.averageDiff > 0
                                ? 'text-red-600'
                                : 'text-blue-700'
                            }
                          >
                            {stats?.averageDiff}
                          </td>
                          <td
                            className={
                              stats?.varianceDiff && stats.varianceDiff > 0
                                ? 'text-red-600'
                                : 'text-blue-700'
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
            <div className="mt-24 font-medium text-lg md:text-2xl">부서</div>
            <ul className="grid grid-cols-1 gap-x-6 gap-y-5 mt-9">
              {departments.map((department, index) => {
                let route =
                  '/admin/web/department/' + department.departmentName;
                return (
                  <li key={index} className="my-2">
                    <DepartmentCard
                      route={route}
                      name={department.departmentName}
                      id={department.managerName}
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
