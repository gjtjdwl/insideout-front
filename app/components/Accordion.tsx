import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

interface AccordionItemProps {
  header: string;
  text: string;
}

const Accordion: React.FC<AccordionItemProps> = ({header, text }) => {
  const [active, setActive] = useState<boolean>(false);

  const handleToggle = () => {
    setActive(!active);
  };

  return (
    <div
      className={`overflow-hidden mb-4 md:mb-8 rounded-lg p-4 ${active ? 'bg-customPink' : 'bg-gray-200'}`}
    >
      <button
        className={`faq-btn flex items-center justify-center w-full text-left`}
        onClick={() => handleToggle()}
      >
        <div className="w-full">
          <h4 className="mt-1 text-sm md:text-lg font-semibold text-dark dark:text-white">
            {header} 상담
          </h4>
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
        <p className="py-3 text-xs md:text-base leading-relaxed text-body-color dark:text-dark-6">
          {text}
        </p>
      </motion.div>
    </div>
  );
};

export default Accordion;
