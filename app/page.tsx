import Image from 'next/image';
import { FaArrowRight } from 'react-icons/fa';

export default function Home() {
  return (
    <div className=' flex flex-col items-center min-h-screen bg-customPink p-[50px]'>
      <div className='flex flex-col items-center bg-white w-[100%]'>
        <img src="./mainLogo.png" className='w-54 h-32 mt-[200px]' alt="asdf" />
        <div className='mb-[200px]'>
          <span className='text-[24px] font-bold'>편안함과 행복을 드립니다</span>
        </div>
        <div className='flex mb-[200px] w-100'>
          <div className='flex items-center justify-center w-[200px] h-[70px] bg-customPink rounded-full text-[22px]'>
            <button >로그인</button>
          </div>
          <div  className='flex ml-20 items-center justify-center w-[200px] h-[70px] bg-white border border-[#D9D9D9] rounded-full text-[22px]'>
            <div className='flex'>
              <div className='ml-8'>
                <button>회원가입</button>
              </div>  
              <div className='bg-[#EDEDED] ml-5 rounded-full w-[35px] h-[35px] flex justify-center items-center'>
                <FaArrowRight size={20} color="#5C5C5C" />
              </div>
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
