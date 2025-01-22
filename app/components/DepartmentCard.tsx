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
  const handleClick = () => {
    router.push(route);
  };
  return (
    <>
      <div className="relative min-h-[100px] p-4 lg:p-8 flex justify-between items-center border rounded-md border-gray-400">
        <div className="flex flex-col">
          <div className="text-sm md-text-2xl  font-bold">{name}</div>
          <div className="mt-2 text-xs md-text-xl">{id}</div>
        </div>
        <Cog6ToothIcon className="absolute h-6 md:w-5 w-4 top-3 right-4" />
        <div className="">
          <button
            onClick={handleClick}
            className="text-xs md:text-base bg-customPink max-w-[200px] px-6 lg:px-14 text-black font-semibold py-2 lg:py-3 rounded-lg hover:bg-customPinkHover focus:outline-none"
          >
            세부사항
          </button>
        </div>
      </div>
    </>
  );
}
