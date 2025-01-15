'use client'

import { useRouter } from "next/navigation";
import React,{ use } from "react";
import { FiChevronLeft } from 'react-icons/fi';

//params는 Promise로 래핑되었기 때문에, 비동기적으로 값을 처리
//React.use()로 params 언래핑
type Props = {
  params: Promise< {
    index: number
  } >;
}
const BoardDetail = ({ params }: Props) => {
  const router = useRouter();
  const { index } = use(params);

  return (
    <div className="p-5 w-full">
      <FiChevronLeft type='button' onClick={() => router.push('/notice')} className="text-2xl mb-4 cursor-pointer"/>
      <div className="flex flex-col justify-center items-center">
        <div>
          {index}번 째 게시물
        </div>
        <div>
          내용입니다.
        </div>
      </div>
    </div>
  );
};
export default BoardDetail