'use client';
import mock from '@/app/mock.json';
import {
  ClipboardDocumentListIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { webManageAPI } from '@/app/api';
import CounselListModal from '@/app/components/CounselListModal';
import { departmentUserData } from '@/app/types/webManage';

export default function Department() {
  const { departmentName } = useParams();
  const deptName = decodeURIComponent(departmentName as string);
  const [users, setUsers] = useState<departmentUserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string>('');
  const [showModal, setShowModal] = useState<Boolean>(false);

  const handleDelete = async (userId: string) => {
    try {
      const response = await webManageAPI.deleteUser(userId);
      alert('부서원이 삭제 되었습니다.');
      window.location.reload();
    } catch (error: unknown) {
      console.log(error);
    }
  };

  const handleModalAndProps = (userId: string) => {
    setShowModal(!showModal);
    setUserId(userId);
  };
  const handleModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    const handleLoad = async () => {
      try {
        const response = await webManageAPI.departmentUsers(deptName);
        setUsers(response);
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
        <div className="flex justify-center bg-white w-full p-10 min-h-[70vh]">
          <div className="max-w-[1200px] w-full">
            <div className="flex items-center justify-between p-4 border-b">
              <div className="font-bold text-xl md:text-3xl">팀원 리스트</div>
            </div>
            <div className="mt-8 mb-12 ml-6 font-medium text-2xl">
              {deptName}
            </div>
            <table className="table-auto w-full border-collapse px-12">
              <thead className="text-left border-b">
                <tr>
                  <th className="px-12 py-4">이름</th>
                  <th className="px-12 py-4">아이디</th>
                  <th className="px-4 py-4">이메일</th>
                  <th className="px-4 py-4">전화번호</th>
                </tr>
              </thead>
              <tbody>
                {users.map((item, index) => (
                  <tr key={index}>
                    <td
                      className={`px-12 py-4 border-b ${item.role === 'MANAGER' ? 'bg-customPink' : ''}`}
                    >
                      {item.name}
                    </td>
                    <td
                      className={`px-12 py-4 border-b ${item.role === 'MANAGER' ? 'bg-customPink' : ''}`}
                    >
                      {item.userId}
                    </td>
                    <td
                      className={`px-4 py-4 border-b ${item.role === 'MANAGER' ? 'bg-customPink' : ''}`}
                    >
                      {item.email}
                    </td>
                    <td
                      className={`px-4 py-4 border-b ${item.role === 'MANAGER' ? 'bg-customPink' : ''}`}
                    >
                      {item.phoneNumber}
                    </td>
                    <td
                      className={`px-4 py-4 border-b ${item.role === 'MANAGER' ? 'bg-customPink' : ''}`}
                    >
                      <div className="flex justify-center">
                        <ClipboardDocumentListIcon
                          onClick={() => handleModalAndProps(item.userId)}
                          className="h-6 w-6 cursor-pointer mr-5 text-gray-500"
                        />

                        <XMarkIcon
                          onClick={() => handleDelete(item.userId)}
                          className="h-6 w-6 cursor-pointer text-red-500"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {showModal && (
              <CounselListModal onClose={handleModal} userId={userId} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
