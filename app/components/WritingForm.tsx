'use client'

import React from "react"
import { PhotoIcon } from '@heroicons/react/24/solid'
import { useRouter } from "next/navigation"

const WritingForm = () => {
  const router = useRouter();

  return (
    <form className="">
      <div className="space-y-12">
        <div className="flex justify-center border-y border-gray-900/10 pb-12">
          <div className="w-[400px] mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
            <div className="sm:col-span-full ">
              <label htmlFor="title" className="block text-sm/6 font-medium text-gray-900">
                제목
              </label>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-[#ffbdc3]">
                
                  <input
                    id="title"
                    name="title"
                    type="text"
                    placeholder="제목을 입력해 주세요."
                    className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="about" className="block text-sm/6 font-medium text-gray-900">
                내용
              </label>
              <div className="mt-2">
                <textarea
                  id="about"
                  name="about"
                  placeholder="문의사항을 입력해 주세요. 사진을 첨부하시면 더 자세한 답변이 가능합니다."
                  rows={5}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#ffbdc3] sm:text-sm/6"
                  defaultValue={''}
                />
              </div>
              
            </div>

            <div className="col-span-full">
              <label htmlFor="cover-photo" className="block text-sm/6 font-medium text-gray-900">
                이미지
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon aria-hidden="true" className="mx-auto size-12 text-gray-300" />
                  <div className="mt-4 flex text-sm/6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-400 focus-within:outline-none hover:text-indigo-600"
                    >
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs/5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" onClick={() => router.back()} className="text-sm/6 font-semibold text-gray-900">
          취소 
        </button>
        <button
          type="submit"
          className="rounded-md bg-customPink px-5 py-2 text-sm font-semibold hover:bg-customPinkHover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF8C98]"
        >
          작성 
        </button>
      </div>
    </form>
  )
}

export default WritingForm