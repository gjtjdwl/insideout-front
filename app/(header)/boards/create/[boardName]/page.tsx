'use client';

import React, { use, useState } from 'react';
import { PhotoIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';
import { useUser } from '@/app/hooks/useUser';
import { BoardAPI } from '@/app/api';
import { IFormData } from '@/app/types/board';

type Props = {
  params: Promise<{
    boardName: string;
  }>;
};
const WriteBoard = ({ params }: Props) => {
  const { boardName } = use(params);
  const router = useRouter();
  const { user } = useUser();
  const [formData, setFormData] = useState<IFormData>({
    userId: '',
    title: '',
    content: '',
    file: null,
  });
  const form = new FormData();
  const [preview, setPreview] = useState<string | null>(null);

  const placeholder =
    boardName === 'inquiry'
      ? `문의사항을 입력해 주세요. 사진을 첨부하시면 더 자세한 답변이 가능합니다.`
      : `공지사항을 입력해 주세요.`;
  const topic = boardName === 'inquiry' ? '문의하기' : '공지하기';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // 기본 동작 차단

    if (user) {
      formData.userId = user.userId;
      console.log('form', formData);

      form.append('userId', formData.userId);
      form.append('title', formData.title);
      form.append('content', formData.content);
      // 파일이 있을 경우 file을 FormData에 추가
      if (formData.file) {
        form.append('file', formData.file);
      }

      try {
        const response = await BoardAPI.createBoard(form);
        
        alert(response.message)
        router.push('/boards/notice')
      } catch (error: unknown) {
        console.error('글 작성 중 오류 발생', error);
        throw error;
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // 텍스트 입력 처리
    if (
      e.target instanceof HTMLTextAreaElement ||
      e.target instanceof HTMLInputElement
    ) {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
    //HTMLInputElement의 files 속성은 input 요소에서만 존재, HTMLTextAreaElement에는 files 속성이 없기 때문에 e.target.files를 접근하려 할 때 문제
    if (
      e.target instanceof HTMLInputElement &&
      e.target.files &&
      e.target.files[0]
    ) {
      const file = e.target.files[0];
      setFormData({
        ...formData,
        file: file,
      });
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div>
      <div className="bg-customPink px-4 sm:px-[50px]">
        <div className="items-center bg-white w-full p-10">
          <div className="flex flex-col items-center justify-center">
            <div className="text-3xl p-6">{topic}</div>
            <div className="w-full">
              <form className="">
                <div className="space-y-12 flex justify-center">
                  <div className="w-[90%] mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
                    <div className="sm:col-span-full ">
                      <label
                        htmlFor="title"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        제목
                      </label>
                      <div className="mt-2">
                        <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-[#ffbdc3]">
                          <input
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            type="text"
                            placeholder="제목을 입력해 주세요."
                            className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="content"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        내용
                      </label>
                      <div className="mt-2">
                        <textarea
                          id="content"
                          name="content"
                          placeholder={placeholder}
                          value={formData.content}
                          onChange={handleChange}
                          rows={20}
                          className="block w-full resize-none rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#ffbdc3] sm:text-sm/6"
                        />
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="cover-photo"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        이미지
                      </label>
                      <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                        <div className="text-center">
                          {preview && (
                            <img
                              src={preview}
                              alt="미리보기"
                              style={{ maxWidth: '200px' }}
                            />
                          )}
                          {formData.file ? (
                            <p>선택된 파일 : {formData.file.name} </p>
                          ) : (
                            <PhotoIcon
                              aria-hidden="true"
                              className="mx-auto size-12 text-gray-300"
                            />
                          )}

                          <div className="mt-4 flex text-sm/6 text-gray-600">
                            <label
                              htmlFor="file-upload"
                              className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-400 focus-within:outline-none hover:text-indigo-600"
                            >
                              <span>Upload a file</span>
                              <input
                                id="file-upload"
                                name="file-upload"
                                type="file"
                                accept="image/*"
                                onChange={handleChange}
                                className="sr-only"
                              />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs/5 text-gray-600">
                            PNG, JPG, GIF up to 10MB
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <button
                    type="button"
                    onClick={() => router.back()}
                    className="text-sm/6 font-semibold text-gray-900"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="rounded-md bg-customPink px-5 py-2 text-sm font-semibold hover:bg-customPinkHover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF8C98]"
                  >
                    작성
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WriteBoard;
