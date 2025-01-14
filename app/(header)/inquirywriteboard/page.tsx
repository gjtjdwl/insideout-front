import WritingForm from "@/app/components/WritingForm"

const InquiryWriteBoard = () => {
  return (
    <div className="bg-customPink px-4 sm:px-[50px]">
      <div className="items-center bg-white w-full p-10">
        <div className="flex flex-col items-center justify-center">
          <div className="text-3xl p-6">
            문의하기
          </div>
          <div className="w-full">
            <WritingForm />
          </div>
        </div>
      </div>
    </div>
  )
}

export default InquiryWriteBoard