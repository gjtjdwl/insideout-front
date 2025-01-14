import WritingForm from "@/app/components/WritingForm"

const NoticeWriteBoard = () => {
  const name: string = '공지사항'
  return (
    <div className="bg-customPink px-4 sm:px-[50px]">
      <div className="items-center bg-white w-full p-10">
        <div className="flex flex-col items-center justify-center">
          <div className="text-3xl p-6">
            공지하기
          </div>
          <div className="w-full">
            <WritingForm formName={name} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default NoticeWriteBoard