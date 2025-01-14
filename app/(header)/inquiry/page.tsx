'use client'
import BoardList from "../../components/BoardList"
import PaginationComponent from "@/app/components/PagenationComponent";
import { useRouter } from 'next/navigation';

const Inquiry = () => {
  const router = useRouter();
  const breakdown = [
    {
      title: '전체 문의 내역'
    },
    {
      title: '나의 문의 내역'
    },
  ];
  const inquiryList = [
    {
      title: '문의합니다.',
      role: '비회원',
    },
    {
      title: '금액 관련 질문 있습니다..',
      role: '부서장 ',
    },
    {
      title: '부서원인데 상담 내역 체크를 잘못 해서 문의드립니다..',
      role: '부서원',
    },
    {
      title: '부서원인데 내역 체크를 잘못 해서 문의드립니다..',
      role: '부서원',
    },
    {
      title: '부서원 관리에 대한 질문입니다.',
      role: '부서장 ',
    },
    {
      title: '오류가 나서 문의합니다.',
      role: '부서원',
    },
    {
      title: '부서원인데 상담 내역 체크를 잘못 해서 문의드립니다..',
      role: '부서원',
    },
    {
      title: '문의합니다. 엄청 긴 문의 입니다. 제발 문의를 받아주세요 제발 제발료 내용은 바로 이러쿵저러쿵',
      role: '부서원',
    },
    {
      title: '너무 길어서 한 줄에 다 담을 수 없는 텍스트입니다. 말줄임표(...)를 사용해서 생략합니다.',
      role: '부서원',
    },
    {
      title: '문의합니다. 엄청 긴 문의 입니다. 제발 문의를 받아주세요 제발 제발료 내용은 바로 이러쿵저러쿵',
      role: '부서원',
    },
  ]

  return (
    <div className="bg-customPink px-4 sm:px-[50px]">
      <div className="items-center bg-white w-full p-10">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="font-bold text-3xl">
            문의게시판
          </div>
          <button onClick={() => router.push('/inquirywriteboard')} className="py-3 px-6 border border-gray-400 rounded-2xl">
            문의하기✏️
          </button>
        </div>
        <div className="flex">
          <div className="border-r border-gray-600 mr-10 py-4 mb-20 whitespace-normal sm:whitespace-nowrap break-words">
            {breakdown.map((item, index)=> (
              <div key={index} className="px-6 pb-4 mt-4 font-semibold cursor-pointer">
                <span>{item.title}</span>
              </div>  
            ))}
          </div>
          <div className="pt-14 w-[90%] flex-grow flex flex-col justify-center">
            <BoardList boardList={inquiryList} />
            <div className="mt-10">
              <PaginationComponent totalPages={13} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Inquiry