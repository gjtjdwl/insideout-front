'use client';

import React, { useState } from 'react'
import { Pagination, PaginationPrevious, PaginationNext, PaginationList, PaginationGap, PaginationPage } from './pagination'


export default function PaginationComponent({ totalPages }: {totalPages: number}) {
  const [currentPage, setCurrentPage] = useState(1)
  const visiblePageCount = 10
  const gap = 2

  const changePage = (page: number) => {
    if(page<1 || page > totalPages) return
    setCurrentPage(page)
  }

  const pageNumbers = []
  for(let i = 1; i <= totalPages; i ++){
    pageNumbers.push(i)
  }


  return (
    <Pagination>
      <PaginationPrevious href={currentPage > 1 ? `/page/${currentPage-1}` : null} />
        <PaginationList>
          {/* 페이지 개수가 5이하일떄 모든 페이지 표시 */}
          {/* 
          Array.from() : 배열 객체에서 새 배열을 생성하는 메서드, 길이와 함수를 바탕으로 배열을 생성
          Array.from(arrayLike, mapFunction) - arrayLike: 이터러블 객체(배열, 문자열 등)
          mapFunction : 배열의 각 요소를 변환할 수 있는 함수(선택)
            const str = "12345";
            const arr = Array.from(str);
            console.log(arr); // ["1", "2", "3", "4", "5"]  => 람다함수같은거네 
           */}
          {totalPages <= visiblePageCount && Array.from({length: totalPages},(_, index) => {
            const page = index + 1;
            return (
              <PaginationPage key={page} href={`/page/${page}`} current={page === currentPage}>
                {page}
              </PaginationPage>
            );
          })
          }
          {/* 페이지 개수가 5 이상일 때 */}
          {totalPages > visiblePageCount && currentPage > 3 && <PaginationPage href="/page/1">1</PaginationPage>} {/* 페이지 5이상, 3번 페이지일경우 앞에 1번페이지 표시 */}
          {totalPages > visiblePageCount && currentPage > 4 && <PaginationGap />} {/* 4번페이지 이상일 경우 앞에 ... 표시 */}
          {totalPages > visiblePageCount &&
            pageNumbers.map((page)=> {
              if(page === currentPage) {
                return (
                  <PaginationPage key={page} href={`/page/${page}`} current>
                    {page}
                  </PaginationPage>
                )
              }else if (page === currentPage -1 || page === currentPage +1) {
                return (
                  <PaginationPage key={page} href={`/page/${page}`}>
                    {page}
                  </PaginationPage>
                );
              } return null
            })
          }
          {totalPages > visiblePageCount && currentPage < totalPages-4 && <PaginationGap />}
          {totalPages > visiblePageCount && currentPage < totalPages-3 && <PaginationPage href={`/page/${totalPages-1}`}>{totalPages-1}</PaginationPage>}
          {totalPages > visiblePageCount && currentPage < totalPages-2 && <PaginationPage href={`/page/${totalPages}`}>{totalPages}</PaginationPage>}
        </PaginationList>
      <PaginationNext href={currentPage < totalPages ? `/page/${currentPage + 1}` : null} />
    </Pagination>
  )
}

