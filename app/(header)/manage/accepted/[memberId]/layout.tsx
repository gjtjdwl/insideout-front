'use client';

import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { FiChevronLeft } from 'react-icons/fi';

export default function departmentMember({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { memberId } = useParams();
  useEffect(() => {}, []);
  return (
    <div className="bg-customPink px-4 sm:px-[50px]">
      <div className="flex justify-center items-center bg-white w-full p-10 min-h-[50vh]">
        <div className="max-w-[1200px] w-full">
          <div className="flex items-center justify-start py-4 border-b">
            <FiChevronLeft
              type="button"
              size={35}
              cursor={'pointer'}
              onClick={() => router.push('/manage/department')}
              className=" mb-1 mr-3 text-gray-600 hover:text-gray-900"
            />
            <div className="font-bold text-xl md:text-3xl">부서원 관리</div>
          </div>
          <div className="border m-8 p-4">{children}</div>
        </div>
      </div>
    </div>
  );
}
