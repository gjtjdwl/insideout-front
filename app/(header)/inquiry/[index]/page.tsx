'use client'

import { useRouter } from "next/navigation";
import React from "react";
type detailProps = {
  board: any;
  index : number;
}
const BoardDetail = ({ board, index }: detailProps) => {
  const router = useRouter();

  return (
    <div>
      <h2>{board.title} </h2>
      <p>{board.role} </p>
    </div>
  );
};
export default BoardDetail