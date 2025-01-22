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
      <div className="relative mt-8 px-8 flex justify-between border rounded-md border-gray-400">
        <div className="py-8">
          <div className="text-xl font-bold">{name}</div>
          <div className="mt-2 text">{id}</div>
        </div>
        <Cog6ToothIcon className="absolute h-6 w-6 top-3 right-4" />
        <div className="py-14">
          <button
            onClick={handleClick}
            className="bg-customPink w-[200px] text-black font-semibold py-2 rounded-lg hover:bg-customPinkHover focus:outline-none"
          >
            세부사항
          </button>
        </div>
      </div>
    </>
  );
}
