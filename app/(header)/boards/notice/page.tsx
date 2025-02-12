import { ServerBoardAPI } from '@/app/api';
import ClientNoticeWrapper from './ClientNoticeWrapper';

// 동적 렌더링을 위한 설정 추가
export const dynamic = 'force-dynamic';
// 캐시 비활성화
export const revalidate = 0;

export default async function Notice() {
  try {
    console.log('서버에서 초기 데이터 요청 시작');
    const noticeData = await ServerBoardAPI.notice('', 0);
    console.log('서버 초기 데이터:', noticeData);

    return (
      <div className="p-4 md:p-10 w-full md:w-[90%] flex-grow flex flex-col justify-center">
        <ClientNoticeWrapper initialData={noticeData} />
      </div>
    );
  } catch (error) {
    console.error('서버에서 공지사항 로드 중 오류:', error);
    const fallbackData = {
      totalElements: 0,
      totalPages: 0,
      first: true,
      last: true,
      size: 10,
      content: [],
    };

    return (
      <div className="p-4 md:p-10 w-full md:w-[90%] flex-grow flex flex-col justify-center">
        <ClientNoticeWrapper initialData={fallbackData} />
      </div>
    );
  }
}
