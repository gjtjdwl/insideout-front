
import React from "react";
import BoardList from "../../../components/BoardList"
import PaginationComponent from "@/app/components/PagenationComponent";


const Inquiry = () => {
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
    <div>
        <BoardList boardList={inquiryList} boardName='inquiry' />
        <div className="mt-10">
          <PaginationComponent totalPages={13} />
        </div>
    </div>

  )
}

export default Inquiry