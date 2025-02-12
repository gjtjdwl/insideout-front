import { Cog6ToothIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { useDepartment } from '../context/DepartmentContext';

interface DepartmentCardProps {
  route: string;
  name: string;
  id: string;
}

export default function DepartmentCard({
  route,
  name,
  id,
}: DepartmentCardProps) {
  const router = useRouter();
  const { setSelectedPerson } = useDepartment();

  const handleSetting = () => {
    alert('설정창');
  };
  const handleClick = () => {
    setSelectedPerson({id, name})
    router.push(route);
  };
  return (
    <>
      <div className="relative min-h-[120px] p-4 md:p-10 flex flex-col sm:flex-row justify-between items-center border rounded-md border-gray-400">
        <div className="flex flex-col">
          <div className="md:text-2xl font-bold break-all">{name}</div>
          <div className="mt-2 text-sm md:text-xl break-all">{id}</div>
        </div>
        {/* <Cog6ToothIcon
          onClick={handleSetting}
          className="absolute w-4 h-4 md:h-6 md:w-6 top-3 right-4 cursor-pointer "
        /> */}
        <div className="">
          <button
            onClick={handleClick}
            className="bg-customPink max-w-[200px] px-4 sm:px-8 lg:px-16 text-black font-semibold py-2 md:py-3 rounded-lg text-xs md:text-base hover:bg-customPinkHover focus:outline-none"
          >
            세부사항
          </button>
        </div>
      </div>
    </>
  );
}
