type BoardListProps = {
  boardList: { title: string; role: string }[]; // any 대신 명확한 타입을 정의하는 것이 좋습니다.
};

export default function BoardList({ boardList }: BoardListProps) {
  return (
    <ul role="list" className="">
      {boardList.map((inquiry,index) => (
        <li key={index} className="flex items-center justify-between border-b gap-x-6 my-5 pb-5 cursor-pointer">
          <div className="flex min-w-0 gap-x-4">
            <div className="min-w-0 flex-auto">
              <p className="max-w-[200px] lg:max-w-[850px] sm:max-w-[300px] truncate font-medium text-gray-900">{inquiry.title}</p>
            </div>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end mr-3">
            <p className="text-sm text-gray-400">{inquiry.role}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}
