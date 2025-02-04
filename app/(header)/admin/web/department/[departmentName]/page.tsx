'use client';
import {
  ClipboardDocumentListIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { webManageAPI } from '@/app/api';
import CounselListModal from '@/app/components/CounselListModal';
import {
  departmentUserData,
  PagedepartmentUserData,
} from '@/app/types/webManage';
import { FiChevronLeft } from 'react-icons/fi';
import PaginationComponent from '@/app/components/PagenationComponent';

export default function Department() {
  const { departmentName } = useParams();
  const router = useRouter();
  const deptName = decodeURIComponent(departmentName as string);
  const [users, setUsers] = useState<departmentUserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string>('');
  const [showModal, setShowModal] = useState<Boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageList, setPageList] = useState<PagedepartmentUserData>();
  const handleDelete = async (userId: string) => {
    const isConfirmed = window.confirm('정말로 이 부서원을 삭제하시겠습니까?');

    if (isConfirmed) {
      try {
        const response = await webManageAPI.deleteUser(userId);
        alert('부서원이 삭제되었습니다.');
      } catch (error) {
        console.error('삭제 중 오류 발생:', error);
        alert('삭제에 실패했습니다.');
      }
    } else {
      alert('삭제가 취소되었습니다.');
    }
  };

  const handleModalAndProps = (userId: string) => {
    setShowModal(!showModal);
    setUserId(userId);
  };
  const handleModal = () => {
    setShowModal(!showModal);
  };

  const handleLoad = async (page: number = 0) => {
    try {
      const response = await webManageAPI.departmentUsers(deptName, page);
      const sortedUsers = [
        ...response.content.filter((user) => user.role === 'MANAGER'), // "MANAGER"는 먼저 배치
        ...response.content.filter((user) => user.role !== 'MANAGER'), // "USER"는 그 뒤에 배치
      ];
      setUsers(sortedUsers);
      setPageList(response);
    } catch (error: unknown) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleLoad(currentPage);
  }, []);

  return (
    <>
      <div className="bg-customPink px-4 sm:px-[50px]">
        <div className="flex justify-center bg-white w-full p-10 min-h-[70vh]">
          <div className="max-w-[1200px] w-full">
            <div className="flex items-center justify-start p-4 border-b">
              <FiChevronLeft
                type="button"
                cursor={'pointer'}
                onClick={() => router.push('/admin/web')}
                className="text-2xl md:text-[35px] mb-1 mr-3 text-gray-600 hover:text-gray-900"
              />
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
