import { ServerBoardAPI } from '@/app/api';
import ClientNoticeWrapper from './ClientNoticeWrapper';

export default async function Notice() {
  // 서버에서 초기 데이터 가져오기
  const noticeData = await ServerBoardAPI.notice('', 0);

  return (
    <div className="p-4 md:p-10 w-full md:w-[90%] flex-grow flex flex-col justify-center">
      <ClientNoticeWrapper initialData={noticeData} />
    </div>
  );
}
