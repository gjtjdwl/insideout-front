import { FiChevronRight } from "react-icons/fi";

interface ButtonProps {
  label: string;
  bgColor: string;
  textColor: string;
  width: string;
  onClick: () => void
  user?: string; 
}

const ButtonIcon: React.FC<ButtonProps> = ({
  label,
  bgColor,
  textColor,
  width,
  onClick,
  user,
}) => {
  return (
    <div className={`flex items-center justify-center ${width} h-[70px] ${bgColor} border border-[#D9D9D9] rounded-full text-[22px] relative`}>
      <button className={`w-full h-[70px] rounded-full pr-5 pt-[2px] ${textColor}`} onClick={onClick}>
        {label}
      </button>
      {user && (
        <div className="w-[40px] h-[40px] flex justify-center items-center absolute right-3">
          <FiChevronRight size={40} color="#5C5C5C" />
        </div>
      )}
    </div>
  );
};

export default ButtonIcon;