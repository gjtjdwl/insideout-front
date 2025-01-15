'use client'

import { useRouter } from "next/navigation";
import React, { use } from "react";
import { FiChevronLeft } from 'react-icons/fi';

type Props = {
  params: Promise<{
    inquiryId: number
  }>;
}
const BoardDetail = ({ params }: Props) => {
  const router = useRouter();
  const { inquiryId } = use(params);

  return (
    <div >
      <FiChevronLeft type='button' onClick={() => router.push('/boards/inquiry')} className="text-2xl mb-4 cursor-pointer" />
      <div className="flex flex-col justify-center items-center">
        <div>
          {inquiryId}+1번 째 게시물
        </div>
        <div>
          내용입니다.
        </div>
      </div>
    </div>
  );
};
export default BoardDetail