import React from 'react';
import { PaginationPage, PaginationPrevious } from './pagination';
import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
} from 'react-icons/fi';
import clsx from 'clsx';

interface PagenationProps {
  currentPage: number;
  onChangePage: (page: number) => void;
  totalPages: number;
}
export default function PaginationComponent({
  currentPage,
  onChangePage,
  totalPages,
}: PagenationProps) {
  const startNum = 1;
  const endNum = totalPages;
  const pageNumbers = Array.from(
    { length: Math.max(endNum - startNum + 1, 0) },
    (_, index) => startNum + index
  );

  const handlePrevGroup = () => {};
  const handleNextGroup = () => {};
  return (
    <div className="flex gap-x-2 justify-center">
      {/* <button
        onClick={handlePrevGroup}
        disabled={currentPage < pageSize}
        className={`${currentPage < pageSize ? 'text-[#87878d]' : 'flex items-center justify-center rounded-lg min-w-[2.25rem] hover:bg-zinc-950/5 before:bg-white/10'}`}
      >
        <FiChevronsLeft />
      </button> */}

      <button
        disabled={currentPage + 1 === 1}
        onClick={() => onChangePage(currentPage - 1)}
        className={
          currentPage + 1 === 1 ? 'text-gray-400' : 'text-black' // disabled일 때 회색과 커서 변경
        }
      >
        <FiChevronLeft />
      </button>
      {pageNumbers.map((page) => (
        <div key={page} onClick={() => onChangePage(page - 1)}>
          <PaginationPage
            key={page}
            current={page === currentPage + 1}
            className="cursor-pointer text-black"
          >
            {page}
          </PaginationPage>
        </div>
      ))}

      <button
        disabled={currentPage + 1 === totalPages}
        onClick={() => onChangePage(currentPage + 1)}
        className={
          currentPage + 1 === totalPages ? 'text-gray-400' : 'text-black' // disabled일 때 회색과 커서 변경
        }
      >
        <FiChevronRight />
      </button>
      {/* <button
        onClick={handleNextGroup}
        disabled={currentPage >= pageSize || totalPages <= pageSize}
        className={`${currentPage >= pageSize || totalPages <= pageSize ? 'text-[#87878d]' : 'flex items-center justify-center rounded-lg min-w-[2.25rem] hover:bg-zinc-950/5 before:bg-white/10'}`}
      >
        <FiChevronsRight />
      </button> */}
    </div>
  );
}
