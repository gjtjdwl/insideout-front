'use client';

import React, { useState } from 'react'
import { Pagination, PaginationPrevious, PaginationNext, PaginationList, PaginationGap, PaginationPage } from './pagination'


export default function PaginationComponent({ totalPages }: {totalPages: number}) {
  const [currentPage, setCurrentPage] = useState(1)
  
  const changePage = (page: number) => {
    if(page<1 || page>totalPages) return
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
          {currentPage > 3 && <PaginationPage href="/page/1">1</PaginationPage>}
          {currentPage > 4 && <PaginationGap />}
          {
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
                )
              } return null
            })
          }
          {currentPage < totalPages-3 && <PaginationGap />}
          {currentPage < totalPages-2 && <PaginationPage href={`/page/${totalPages}`}>{totalPages}</PaginationPage>}
        </PaginationList>
      <PaginationNext href={currentPage < totalPages ? `/page/${currentPage + 1}` : null} />
    </Pagination>
  )
}

