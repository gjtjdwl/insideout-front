import { Cog6ToothIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

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
  const handleSetting = () => {
    alert('설정창');
  };
  const handleClick = () => {
    router.push(route);
  };
  return (
    <>
      <div className="relative min-h-[120px] p-4 md:p-10 flex justify-between items-center border rounded-md border-gray-400">
        <div className="flex flex-col">
          <div className="text-base md:text-2xl font-bold">{name}</div>
          <div className="mt-2 text-sm md:text-xl">{id}</div>
        </div>
        <Cog6ToothIcon
          onClick={handleSetting}
          className="absolute h-6 w-6 top-3 right-4 cursor-pointer "
        />
        <div className="">
          <button
            onClick={handleClick}
            className="bg-customPink max-w-[200px] px-6 md:px-8 lg:px-16 text-black font-semibold py-2 md:py-3 rounded-lg text-xs md:text-base hover:bg-customPinkHover focus:outline-none"
          >
            세부사항
          </button>
        </div>
      </div>
    </>
  );
}
