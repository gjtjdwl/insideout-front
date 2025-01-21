'use client';
import { FiChevronLeft } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

type Props = {
  params: Promise<{
    sessionId: number;
  }>;
};
const chatSession = ({ params }: Props) => {
  const router = useRouter();

  return (
    <div className="bg-customPink px-4 sm:px-[50px]">
      <div className="items-center bg-white w-full p-10 min-h-[50vh]">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="font-bold text-xl md:text-3xl">부서원 관리</div>
        </div>
        <div className="border m-8 p-4 min-h-[500px]">
          <div className="p-4 flex items-center">
            <FiChevronLeft
              type="button"
              size={25}
              cursor={'pointer'}
              onClick={() => router.back()}
              className="text-gray-600 hover:text-gray-900 mb-[3px] "
            />
            <span className="text-base md:text-xl font-semibold ml-3">
              부서원3
            </span>
          </div>
          <div className="p-4 mx-9 ">
            <div>상담내용</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default chatSession;
