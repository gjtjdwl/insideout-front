import { Cog6ToothIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

export default function DepartmentCard() {
  const router = useRouter();
  const handleClick = () => {
    router.push('/admin/web/department');
  };
  return (
    <>
      <div className="relative mt-8 px-8 flex justify-between border rounded-md border-gray-400">
        <div className="py-8">
          <div className="text-xl font-bold">부서 이름</div>
          <div className="mt-2 text">부서장 이름</div>
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
