'use client'

import { useRouter } from "next/navigation";
import { comment } from "postcss";
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

  const commentList = [
    {
      id: '관리자',
      time: '2024.10.22. 00:34',
      comment: '안녕하세요. 관리자입니다.\n 답변해드렸습니다.감사합니다.\n 부서장님도 새해 복 많이 받으세요.',
    },
    {
      id: '부서장',
      time: '2024.10.22. 01:34',
      comment: '네 관리자님 답변 감사바리 셰키바리 ~ ',
    },
    {
      id: '관리자',
      time: '2024.10.22. 01:40',
      comment: '셰키요? ',
    },
    {
      id: '부서장',
      time: '2024.10.22. 02:10',
      comment: '아아... 죄송합니다. 텍스트 대치 때문에.. 안녕히개새 요.. ',
    },
    {
      id: '부서장',
      time: '2024.10.22. 02:10',
      comment: '계세요! ',
    },
  ]

  return (
    <div >
      <FiChevronLeft type='button' onClick={() => router.push('/boards/inquiry')} className="text-2xl mb-4 cursor-pointer" />
      <div className="flex flex-col items-start">
        <div className="border-b w-full">
          <div className="px-4 py-2">
            <div>
              <div>
                <span className="lg:text-xl font-bold mr-2">제목이 만약에 이렇게 길다면 어떡할거지 ? 더 길다 더더더더더더 우하하하하이렇게 더길어 줄바꿈 나쁘지 않네 ㅋ</span>
                <span className="text-xs lg:text-sm text-[#FD5151]">답변중</span>
              </div>
            </div>
            <div>
              <div className="flex flex-col text-xs lg:text-sm text-[#757575] mt-3">
                <span> 부서장 </span>
                <span>2024.10.21. 00:34</span>
              </div>
            </div>
          </div>
        </div>
        {/* 내용 */}
        <div className="p-4 min-h-96 text-sm lg:text-base">
          안녕하세요. 이러쿵저러쿵입니다.
          반갑습니다.
          그래서 어떻게 하면 될지 모르겠네요. 하지만 이런 저런 사람들은 이런 저런 사정이 있으니까, 아무쪼록 부탁 드리겠습니다.
          감사합니다. 독감이 유행인데 몸 조심 하시고 새해 복 많이 받으세요.
        </div>
        <div className="border-b w-full">
          <div className="px-4 py-2 font-semibold text-sm lg:text-lg">
            <span>답변</span>
          </div>
        </div>
        {/* 답변 */}
        {
          commentList.map((comt, index) => (
            <div key={index} className={`p-4 w-full ${comt.id === '부서장' ? 'bg-[#f5f5f5]' : ''}`}>
              <div className="flex flex-col mb-3">
                <span className="text-sm lg:text-lg font-semibold text-gray-700 ">{comt.id}</span>
                <span className="text-xs lg:text-sm text-[#757575]">{comt.time}</span>
              </div>
              <div className="text-sm lg:text-base">
                {comt.comment}
              </div>
            </div>
          ))
        }
        {/* 답글창 */}
        <div className="w-full mt-4">
          <div className="border p-4 ">
            <span className="lg:text-base text-sm font-semibold text-gray-700">
              부서장
            </span>
            <div className="flex flex-col sm:flex-row mt-4 ">
              <textarea id="comment"
                name="comment"
                placeholder="추가 문의가 있으시면 답글을 남겨주세요"
                className="w-full resize-none min-h-20 placeholder:text-sm lg:placeholder:text-base overflow-auto focus:outline focus:outline-2 focus:-outline-offset-1 focus:outline-[#ffbdc3]"
              />
              <button className="bg-customPink rounded-md w-full sm:w-[10%] text-sm lg:text-base">등록</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BoardDetail