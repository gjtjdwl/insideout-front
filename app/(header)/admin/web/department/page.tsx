'use client';
import mock from '@/app/mock.json';
import {
  ClipboardDocumentListIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
export default function Department() {
  const handleDelete = () => {
    alert('부서원이 삭제 되었습니다.');
  };

  const handleModal = () => {
    alert('열려라 모달창! 오픈 쎗서미!!');
  };

  return (
    <>
      <div className="bg-customPink px-4 sm:px-[50px]">
        <div className="bg-white px-44 py-16">
          <div className="mt-8 mb-12 ml-6 font-medium text-3xl">
            프론트 엔드 팀
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
              {mock.map((item) => (
                <tr key={item.userid}>
                  <td
                    className={`px-12 py-4 ${item.role === 'MANAGER' ? 'border-y border-l border-pink-400' : 'border-b'}`}
                  >
                    {item.name}
                  </td>
                  <td
                    className={`px-12 py-4 ${item.role === 'MANAGER' ? 'border-y border-pink-400' : 'border-b'}`}
                  >
                    {item.userid}
                  </td>
                  <td
                    className={`px-4 py-4 ${item.role === 'MANAGER' ? 'border-y border-pink-400' : 'border-b'}`}
                  >
                    {item.email}
                  </td>
                  <td
                    className={`px-4 py-4 ${item.role === 'MANAGER' ? 'border-y border-pink-400' : 'border-b'}`}
                  >
                    {item.phoneNumber}
                  </td>
                  <td
                    className={`px-4 py-4 ${item.role === 'MANAGER' ? 'border-y border-r border-pink-400' : 'border-b'}`}
                  >
                    <div className="flex justify-center">
                      <ClipboardDocumentListIcon
                        onClick={handleModal}
                        className="h-6 w-6 cursor-pointer mr-5 text-gray-500"
                      />

                      <XMarkIcon
                        onClick={handleDelete}
                        className="h-6 w-6 cursor-pointer text-red-500"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
