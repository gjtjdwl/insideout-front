import { useRouter } from "next/navigation";
import React,{ useEffect, useState } from "react";

const BoardDetail = ({ board }: any) => {
  const router = useRouter();
  // const { index } = router.query; // URL에서 'index'를 추출
  const [selectIndex, setSelectIndex] = useState<number | null>(null);

  
  // useEffect(()=>{
  //   if (index != undefined){
  //     setSelectIndex(Number(index))
  //   }
  // },[index])
  // if (selectIndex === null || !board[selectIndex]) {
  //   return <p>해당 글을 찾을 수 없습니다.</p>;
  // }
  // const selectedPost = board[selectIndex];

  return (
    <div>
      <h2>{board.title}</h2>
      <p>{board.content}</p>

    </div>
  );
};
export default BoardDetail