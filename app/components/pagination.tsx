import clsx from 'clsx'
import type React from 'react'
import { Button } from './button'
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";

/*
pagination - 전체 nav element, props: totalPages, currentPage
previous - 이전 버튼 href: 이전 페이지 링크, children: 버튼텍스트
next - 다음 버튼 
list - 페이지 번호
page - 각 페이지 번호 
gap - 페이지 번호 사이 ... 형태 구분자 

clsx : css 동적 제어
1. 병합
2. 조건부 클래스
3. 객체로 조건 추가
4. false값 무시

React.PropsWithChildren : react 컴포넌트에 children을 포함한 props 정의 (href,className은 선택)

*/
export function Pagination({
  'aria-label': ariaLabel = 'Page navigation',
  className,
  ...props
}: React.ComponentPropsWithoutRef<'nav'>) {
  return <nav aria-label={ariaLabel} {...props} className={clsx(className, 'flex gap-x-1 justify-center')} />
}

export function PaginationPrevious({
  href = null,
  className,
  children = '이전',
}: React.PropsWithChildren<{ href?: string | null; className?: string }>) {
  return (
    <span className={clsx(className, 'flex  justify-end')}>
      <Button {...(href === null ? { disabled: true } : { href })} plain aria-label="Previous page">
      <FiChevronLeft />
        {/* {children} */}
      </Button>
    </span>
  )
}

export function PaginationNext({
  href = null,
  className,
  children = '다음',
}: React.PropsWithChildren<{ href?: string | null; className?: string }>) {
  return (
    <span className={clsx(className, 'flex  justify-end')}>
      <Button {...(href === null ? { disabled: true } : { href })} plain aria-label="Next page">
        {/* {children} */}
        <FiChevronRight />
      </Button>
    </span>
  )
}

export function PaginationList({ className, ...props }: React.ComponentPropsWithoutRef<'span'>) {
  return <span {...props} className={clsx(className, 'hidden items-baseline gap-x-2 sm:flex')} />
}

export function PaginationPage({
  className,
  current = false,
  children,
}: React.PropsWithChildren<{className?: string; current?: boolean }>) {
  return (
    <Button
      plain
      aria-label={`Page ${children}`}
      aria-current={current ? 'page' : undefined}
      className={clsx(
        className,
        'min-w-[2.25rem] before:absolute before:-inset-px before:rounded-lg',
        current && 'before:bg-zinc-950/5 dark:before:bg-white/10'
      )}
    >
      <span className="-mx-0.5">{children}</span>
    </Button>
  )
}

export function PaginationGap({
  className,
  children = <>&hellip;</>,
  ...props
}: React.ComponentPropsWithoutRef<'span'>) {
  return (
    <span
      aria-hidden="true"
      {...props}
      className={clsx(
        className,
        'w-[2.25rem] select-none text-center text-sm/6 font-semibold text-zinc-950 dark:text-white'
      )}
    >
      {children}
    </span>
  )
}
