import Link from 'next/link';

const member = () => {
  const session = [
    {
      date: '2024.12.12',
    },
    {
      date: '2024.12.13',
    },
    {
      date: '2024.12.14',
    },
    {
      date: '2024.12.15',
    },
    {
      date: '2024.12.16',
    },
  ];
  return (
    <div className="bg-customPink px-4 sm:px-[50px]">
      <div className="items-center bg-white w-full p-10 min-h-[50vh]">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="font-bold text-xl md:text-3xl">부서원 관리</div>
        </div>
        <div className="border m-8 p-4">
          <div className="p-4">
            <span className="text-base md:text-xl font-semibold">부서원3</span>
          </div>
          <div className="p-4">
            <ul role="list" className=" min-h-[40vh]">
              {session.map((session, index) => (
                <li key={index} className="gap-x-6  cursor-pointer">
                  <Link
                    href={`/manage/accepted/${index}`}
                    className="flex items-center justify-between border mb-5 p-4"
                  >
                    <div className="flex min-w-0 gap-x-4">
                      <div className="min-w-0 flex-auto">
                        <p className="max-w-[200px] lg:max-w-[850px] sm:max-w-[300px] truncate font-medium text-gray-900">
                          {session.date}
                        </p>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default member;
