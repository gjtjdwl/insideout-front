const people = [
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

export default function BoardList() {
  return (
    <ul role="list" className="">
      {people.map((person,index) => (
        <li key={index} className="flex items-center justify-between border-b gap-x-6 my-5 pb-5 cursor-pointer">
          <div className="flex min-w-0 gap-x-4">
            <div className="min-w-0 flex-auto">
              <p className="max-w-[200px] lg:max-w-[850px] sm:max-w-[300px] truncate font-medium text-gray-900">{person.title}</p>
            </div>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end mr-3">
            <p className="text-sm text-gray-400">{person.role}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}
