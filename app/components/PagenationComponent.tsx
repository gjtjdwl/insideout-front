'use client';

import React, { useState } from 'react';
import {
  Pagination,
  PaginationPrevious,
  PaginationNext,
  PaginationList,
  PaginationGap,
  PaginationPage,
} from './pagination';
import { FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';

export default function PaginationComponent({
  totalPages,
  boardName,
}: {
  totalPages: number;
  boardName : string;
}) {
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 10;
  const startPage = Math.floor((currentPage - 1) / pageSize) * pageSize + 1;
  const endPage = Math.min(startPage + pageSize - 1, totalPages);
  const pageNumbers = Array.from(
    { length: Math.max(endPage - startPage + 1,0) },
    (_, index) => startPage + index
  );

  const handlePrevGroup = () => {
    if (startPage - pageSize >= 1) {
      setCurrentPage(startPage - pageSize);
    }
  };
  const handleNextGroup = () => {
    if (startPage + pageSize <= totalPages) {
      setCurrentPage(startPage + pageSize);
    }
  };

  return (
    <Pagination>
      <button
        onClick={handlePrevGroup}
        disabled={currentPage < pageSize}
        className={`${currentPage < pageSize ? 'text-[#87878d]' : 'flex items-center justify-center rounded-lg min-w-[2.25rem] hover:bg-zinc-950/5 before:bg-white/10'}`}
      >
        <FiChevronsLeft />
      </button>
      <PaginationPrevious
        href={currentPage > 1 ? `/boards/${boardName}/${currentPage - 1}` : null}
      />
      <PaginationList>
        {pageNumbers.map((page) => (
          <PaginationPage
            key={page}
            href={`/boards/${boardName}/${page}`}
            current={page === currentPage}
          >
            {page}
          </PaginationPage>
        ))}
      </PaginationList>
      <PaginationNext
        href={currentPage < totalPages ? `/boards/${boardName}/${currentPage + 1}` : null}
      />
      <button
        onClick={handleNextGroup}
        disabled={currentPage >= pageSize || totalPages <= pageSize}
        className={`${currentPage >= pageSize || totalPages <= pageSize ? 'text-[#87878d]' : 'flex items-center justify-center rounded-lg min-w-[2.25rem] hover:bg-zinc-950/5 before:bg-white/10'}`}
      >
        <FiChevronsRight />
      </button>
    </Pagination>
  );
}
