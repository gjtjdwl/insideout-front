import moment from 'moment';

/**
 * 날짜 포맷터 함수
 * @param isoString ISO 형식의 날짜 문자열
 * @returns 포맷된 날짜 문자열 (예: 2025.01.16 17:34)
 */
export const formatDateTime = (isoString: string): string => {
  return moment(isoString).format("YYYY.MM.DD HH:mm");
};

export const formatDateTimeDepart = (isoString: string): string => {
  return moment(isoString).format("MM월 DD일");
};
