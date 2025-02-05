import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

interface AccordionItemProps {
  header: string;
  text: string;
  feedback: string;
  status: string;
}
interface ContentProps {
  summaryContent: string;
  proposalContent: string;
}
const Accordion: React.FC<AccordionItemProps> = ({
  header,
  text,
  feedback,
  status,
}) => {
  const [active, setActive] = useState<boolean>(false);
  const [content, setContent] = useState<ContentProps>();
  const [imporv, setImprov] = useState<string[]>([]);
  const formatData = () => {
    const sections = text
      .split(/\[\s*(.*?)\s*\]/)
      .map((item) => item.trim())
      .filter(Boolean); // [] 내부 추출
    const match = feedback.match(/\[개선사항\]([\s\S]*)/); // 이후 텍스트 추출
    if (!match) return;
    const list = match[1]
      .trim()
      .split(/\n+/)
      .map((item) => item.replace(/^•\s*/, ''));

    const formattedData: ContentProps = {
      summaryContent: sections[1],
      proposalContent: sections[3],
    };
    setImprov(list);
    setContent(formattedData);
  };
  const handleToggle = () => {
    setActive(!active);
    formatData();
  };

  return (
    <div
      className={`overflow-hidden mb-4 md:mb-8 rounded-lg p-4 ${active ? 'bg-customPink' : 'bg-gray-200'}`}
    >
      <button
        className={`faq-btn flex items-center justify-center w-full text-left`}
        onClick={() => handleToggle()}
      >
        <div className="w-full flex justify-between items-center">
          <h4 className="mt-1 ml-3 text-sm md:text-lg font-bold text-dark dark:text-white">
            {header}
          </h4>
          <div className={`text-xs md:text-sm bg-white rounded-md px-2 ${status === "STABLE" ? "text-[#0088FF]" : "text-[#FF4B4B]" }`}>
            {status.toLowerCase()}
          </div>
        </div>

        <div className="md:h-10 w-full max-w-[40px] flex items-center justify-center rounded-lg bg-primary/5 text-primary dark:bg-white/5">
          <ChevronDownIcon
            className={`md:h-6 md:w-6 h-4 w-5 fill-primary stroke-primary duration-200 ease-in-out ${
              active ? 'rotate-180' : ''
            }`}
          />
        </div>
      </button>

      <motion.div
        initial={false}
        animate={{ height: active ? 'auto' : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="overflow-hidden md:px-4"
      >
        <p className="font-semibold py-3 text-xs md:text-base leading-relaxed text-body-color dark:text-dark-6">
          상담 요약
        </p>
        <p className=" text-xs md:text-base leading-relaxed text-body-color dark:text-dark-6">
          {content?.summaryContent}
        </p>
        <p className="font-semibold py-3 text-xs md:text-base leading-relaxed text-body-color dark:text-dark-6">
          제안
        </p>
        <p className=" text-xs md:text-base leading-relaxed text-body-color dark:text-dark-6">
          {content?.proposalContent}
        </p>
        <p className="text-[#5164ff] font-semibold pt-3 text-xs md:text-base leading-relaxed text-body-color dark:text-dark-6">
          전달 된 개선사항
        </p>
        {imporv.map((item) => (
          <p key={item}>▸ {item}</p>
        ))}
      </motion.div>
    </div>
  );
};

export default Accordion;
