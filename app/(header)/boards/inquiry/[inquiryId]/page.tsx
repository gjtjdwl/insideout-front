'use client';

import { useUser } from '@/app/hooks/useUser';
import { useRouter } from 'next/navigation';
import React, { use, useState, useEffect } from 'react';
import { FiChevronLeft } from 'react-icons/fi';
import { CommentData, InquiryData, apiData } from '@/app/types/board';
import { BoardAPI } from '@/app/api';
import InquiryContents from '@/app/components/InquiryContents';
import { formatDateTime } from '@/app/utils/dataFormatter';
import moment from 'moment';

type Props = {
  params: Promise<{
    inquiryId: number;
  }>;
};
const BoardDetail = ({ params }: Props) => {
  const router = useRouter();
  const { inquiryId } = use(params);
  const { user } = useUser();
  const [detail, setDetail] = useState<InquiryData>({} as InquiryData); // 여기 타입좀 봐주실분 .. ..
  const [selectTab, setSelectTab] = useState<string>('전체');
  const [formattedTime, setFormattedTime] = useState<string>('');
  const [comment, setComment] = useState<CommentData>({
    userId: '',
    inquiryId: Number(inquiryId),
    content: '',
    commentId: 0,
    message: '',
  });
  const [comments, setComments] = useState<CommentData[]>([]);
  const [deleteData, setDeleteData] = useState<apiData>({
    inquiryId: inquiryId,
    userId: '',
  });

  //문의 상세
  const inquiryDetail = async (inquiryId: number): Promise<void> => {
    try {
      const response = await BoardAPI.inquiryDetail(inquiryId);
      setDetail(response);
      setComments(response.comments);
      setDeleteData((prev) => ({
        ...prev,
        userId: user?.userId,
      }));
      if (response.modifiedTime === null) {
        const formattedTime = formatDateTime(String(response.createdTime));
        setFormattedTime(formattedTime);
      } else {
        const formattedTime = formatDateTime(String(response.modifiedTime));
        setFormattedTime(formattedTime);
      }
    } catch (error: unknown) {
      console.error('문의 상세 가져오는 중 오류 발생', error);
      throw error;
    }
  };
  //문의 삭제
  const handleDelete = async () => {
    try {
      const response = await BoardAPI.deleteBoard('inquriy', deleteData);
      alert(response.message);
      router.push('/boards/inquiry');
    } catch (error) {
      console.error('삭제 실패:', error);
    }
  };

  // 댓글 감지
  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (user) {
      setComment((prev) => ({
        ...prev,
        userId: user.userId,
        content: e.target.value,
      }));
    }
  };

  // 댓글 작성
  const handleCommentSubmit = async () => {
    if (!comment.content) {
      alert('댓글을 입력해주세요.');
      return;
    }
    try {
      const response = await BoardAPI.createComment(inquiryId, comment);
      alert(response.message);
      await inquiryDetail(Number(inquiryId));
      setComment((prev) => ({
        ...prev,
        content: '',
      }));
    } catch (error: unknown) {
      console.error('댓글 작성 오류', error);
      setComment((prev) => ({
        ...prev,
        content: '',
      }));
    }
  };

  // 엔터 키 감지
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommentSubmit();
    }
  };

  // 댓글 삭제
  const handleCommentDelete = async (commentId: number, userId: string) => {
    try {
      const reqDelet = {
        commentId,
        userId,
      };
      const response = await BoardAPI.deleteComment(reqDelet);
      alert('댓글 삭제 완료');
      await inquiryDetail(Number(inquiryId));
    } catch (error: unknown) {
      console.log('댓글 삭제 오류', error);
    }
  };

  useEffect(() => {
    if (inquiryId) {
      inquiryDetail(Number(inquiryId));
    }
  }, []);

  return (
    <div className="flex">
      <InquiryContents setSelectTab={setSelectTab} />
      <div className="mt-9 w-[90%] flex-grow flex flex-col justify-center border p-10">
        <FiChevronLeft
          type="button"
          onClick={() => router.push('/boards/inquiry')}
          className="text-2xl mb-4 cursor-pointer"
        />
        <div className="flex flex-col items-start">
          <div className="border-b w-full">
            <div className="px-4 py-2">
              <div>
                <div>
                  <span className="lg:text-xl font-bold mr-2">
                    {' '}
                    {detail.title}{' '}
                  </span>
                  {comments.length > 0 ? (
                    <span className="text-xs lg:text-sm text-[#5173fd]">
                      답변완료
                    </span>
                  ) : (
                    <span className="text-xs lg:text-sm text-[#FD5151]">
                      답변중
                    </span>
                  )}
                </div>
              </div>
              <div>
                <div className="text-xs lg:text-sm text-[#757575] mt-3">
                  <span> {detail.userId} </span>
                  <div>
                    <span>{formattedTime}</span>
                    {detail.modifiedTime && <span> 수정됨 </span>}
                    {user && user.role === 'ADMIN' && (
                      <button
                        onClick={handleDelete}
                        className="ml-2 text-xs lg:text-sm text-[#757575] hover:text-[#ff8080]"
                      >
                        삭제
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* 내용 */}
          <div className="p-4 min-h-96 text-sm lg:text-base">
            {detail.content}
          </div>
          <div className="border-b w-full">
            <div className="px-4 py-2 font-semibold text-sm lg:text-lg">
              <span>답변</span>
            </div>
          </div>
          {/* 답변 */}
          {comments.length === 0 && (
            <div className="p-4 h-[120px] text-[#757575]">
              {' '}
              댓글이 없습니다.{' '}
            </div>
          )}
          {comments.map((comt, index) => {
            const formattedDate = moment(comt.createdTime).format(
              'YYYY-MM-DD HH:mm:ss'
            );
            return (
              <div
                key={index}
                className={`p-4 w-full ${comt.userId === user?.userId ? 'bg-[#f5f5f5]' : ''}`}
              >
                <div className="flex flex-col mb-3">
                  {/* {user &&
                    (comt.role === 'ADMIN' ? (
                      <span className="text-sm lg:text-lg font-semibold text-gray-700 ">
                        {user?.role}
                      </span>
                    ) : ( */}
                  <span className="text-sm lg:text-lg font-semibold text-gray-700 ">
                    {comt.userId}
                  </span>
                  {/* ))} */}

                  <div className="flex">
                    <span className="text-xs lg:text-sm text-[#757575]">
                      {formattedDate}
                    </span>
                    {user && user.role === 'ADMIN' && (
                      <button
                        onClick={() => {
                          handleCommentDelete(comt.commentId, comt.userId);
                        }}
                        className="ml-2 text-xs lg:text-sm text-[#757575] hover:text-[#ff8080]"
                      >
                        수정
                      </button>
                    )}
                    {user &&
                      (user.role === 'ADMIN' ||
                        user.userId === comt.userId) && (
                        <button
                          onClick={() => {
                            handleCommentDelete(comt.commentId, comt.userId);
                          }}
                          className="ml-1 text-xs lg:text-sm text-[#757575] hover:text-[#ff8080]"
                        >
                          삭제
                        </button>
                      )}
                  </div>
                </div>

                <div className="text-sm lg:text-base">{comt.content}</div>
              </div>
            );
          })}
          {/* 답글창 */}
          <div className="w-full mt-4">
            <div className="border p-4 ">
              <span className="lg:text-base text-sm font-semibold text-gray-700">
                {user ? user.name : '가입안하심'}
              </span>
              <div className="flex flex-col sm:flex-row mt-4 ">
                <textarea
                  id="comment"
                  name="comment"
                  placeholder="추가 문의가 있으시면 답글을 남겨주세요"
                  onChange={handleCommentChange}
                  onKeyDown={handleKeyPress}
                  value={comment.content}
                  className="w-full resize-none p-2 mr-[3px] min-h-20 placeholder:text-sm lg:placeholder:text-base overflow-auto focus:outline focus:outline-2 focus:-outline-offset-1 focus:outline-[#ffbdc3]"
                />
                <button
                  onClick={handleCommentSubmit}
                  className="bg-customPink rounded-md w-full sm:w-[10%] text-sm lg:text-base"
                >
                  등록
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BoardDetail;
