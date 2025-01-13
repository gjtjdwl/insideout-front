import BoardList from "../../components/BoardList"

const Inquiry = () => {
  const breakdown = [
    {
      title: '전체 문의 내역'
    },
    {
      title: '나의 문의 내역'
    },
  ];

  return (
    <div className="bg-customPink px-4 sm:px-[50px]">
      <div className="items-center bg-white w-full p-10">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="font-bold text-3xl">
            문의게시판
          </div>
          <button className="py-3 px-6 border border-gray-400 rounded-2xl">
            문의하기✏️
          </button>
        </div>
        <div className="flex">
          <div className="border-r border-gray-600 mr-4 py-4 whitespace-normal sm:whitespace-nowrap break-words">
            {breakdown.map((item, index)=> (
              <div key={index} className="p-4 mt-2 font-semibold">
                <span>{item.title}</span>
              </div>  
            ))}
          </div>
          <div className="py-14 w-[90%] flex-grow">
            <BoardList />
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default Inquiry