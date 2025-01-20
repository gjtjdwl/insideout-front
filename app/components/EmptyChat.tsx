import React from 'react';
import Image from 'next/image';
import flowerImage from '../../public/flower_chat.png';

interface EmptyChatProps {
  onCreateChat: () => void;
}

const EmptyChat: React.FC<EmptyChatProps> = ({ onCreateChat }) => {
  return (
    <div className="h-full flex flex-col items-center justify-center p-6">
      <div className="mb-8">
        <Image src={flowerImage} alt="빈 채팅방" width={200} height={200} />
      </div>
      <p className="text-gray-600 mb-6 text-center">
        상담을 진행하여 편하게 속마음을 얘기해 보세요
      </p>
      <button
        onClick={onCreateChat}
        className="px-6 py-3 bg-customPink text-black rounded-full hover:bg-customPinkHover transition-colors"
      >
        상담 진행하기
      </button>
    </div>
  );
};

export default EmptyChat;
