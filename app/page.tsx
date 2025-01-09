import Image from 'next/image';
import { FiChevronRight } from "react-icons/fi";

export default function Home() {
  return (
    <div className=' flex flex-col items-center min-h-screen bg-customPink p-[50px]'>
      <div className='flex flex-col items-center bg-white w-[100%]'>
        <img src="./mainLogo.png" className='w-54 h-32 mt-[200px]' alt="asdf" />
        <div className='mb-[200px]'>
          <span className='text-[24px] font-bold'>편안함과 행복을 드립니다</span>
        </div>
        
        <div className='flex flex-col sm:flex-row items-center w-full sm:w-auto mb-60'>
          <div className='flex items-center justify-center w-[200px] h-[70px] bg-customPink rounded-full text-[22px] mb-4 sm:mb-0'>
            <button className='w-full h-[70px] rounded-full pt-[2px]'>로그인</button>
          </div>
          <div className='flex sm:ml-20 items-center justify-center w-[200px] h-[70px] bg-white border border-[#D9D9D9] rounded-full text-[22px] relative'>
            <button className='w-full h-[70px] rounded-full pr-5 pt-[2px]'>회원가입</button>
            <div className=' w-[40px] h-[40px] flex justify-center items-center absolute right-3'>
              <FiChevronRight size={40} color="#5C5C5C" />
            </div>
          </div>
        </div>

        <div className='bg-customPink min-w-full h-80 mb-[200px]'>
          어쩌구 저쩌구
        </div>
        <div className='h-80'>
          컨텐츠를 채웁시다 
        </div>
      </div>
    </div>
  );
}
