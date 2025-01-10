import { FiChevronRight } from "react-icons/fi";

interface ButtonProps {
  label: string;
  bgColor: string;
  hoverColor: string;
  textColor: string;
  width: string;
  onClick: () => void
}

const ButtonIcon: React.FC<ButtonProps> = ({
  label,
  bgColor,
  hoverColor,
  textColor,
  width,
  onClick,
}) => {
  return (
    <div onClick={onClick} className={`flex items-center justify-center ${width} h-[70px] ${bgColor} ${hoverColor} border border-[#D9D9D9] rounded-full text-[22px] relative `}>
      <button className={`w-full h-[70px] rounded-full pr-5 pt-[2px] ${textColor}`}>
        {label}
      </button>
      <div className="w-[40px] h-[40px] flex justify-center items-center absolute right-3 cursor-pointer">
        <FiChevronRight size={40} color="#5C5C5C" />
      </div>
    </div>
  );
};

export default ButtonIcon;