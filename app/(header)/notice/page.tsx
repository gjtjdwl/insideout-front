'use client'
import BoardList from "../../components/BoardList"
import PaginationComponent from "@/app/components/PagenationComponent";
import { useRouter } from 'next/navigation';

const Notice = () => {
  const router = useRouter();
  const noticeList = [
    {
      title: '공지입니다.',
      role: '관리자',
    },
    {
      title: '도움이 필요할 때, 마음이 사용 가이드.',
      role: '관리자',
    },
    {
      title: 'Inside Out에서 제공하는 유용한 정보와 혜택에 대해서 안내드립니다.',
      role: '관리자',
    },
    {
      title: '공지 계정 보호 및 보안 기능에 대해 안내 드립니다.',
      role: '관리자',
    },
    {
      title: '[해결 완료] SSO 설정 시 로그인 실패 현상',
      role: '관리자',
    },
    {
      title: '상담 지원 API 출시 안내',
      role: '관리자',
    },
    {
      title: '[안내] 정기 배포 작업 진행 (12/12)',
      role: '관리자',
    },
    {
      title: '[안내] 11/21(목) v4.1 정기 업데이트 시 PC앱 디자인 변경',
      role: '관리자',
    },
  ]

  return (
    <div className="bg-customPink px-4 sm:px-[50px]">
      <div className="items-center bg-white w-full p-10">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="font-bold text-3xl">
            공지사항 
          </div>
          <button onClick={() => router.push('/inquirywriteboard')} className="py-3 px-6 border border-gray-400 rounded-2xl">
            공지하기✏️
          </button>
        </div>
        <div className="flex">
          <div className="pt-14 w-[90%] flex-grow flex flex-col justify-center px-14">
            <BoardList boardList={noticeList} />
            <div className="mt-10">
              <PaginationComponent totalPages={5} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Notice