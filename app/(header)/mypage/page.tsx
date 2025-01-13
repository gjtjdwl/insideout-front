import { useUser } from '../../hooks/useUser';

export default function Mypage() {
  return (
    <div className="bg-customPink px-4 sm:px-[50px]">
      <div className="bg-white px-44 py-16">
        <div className="flex justify-center items-center px-4 sm:px-0">
          <h3 className="text-4xl leading-loose font-semibold text-gray-900">
            마이페이지
          </h3>
        </div>
        <hr className="mb-12" />
        <div className="mt-6 px-24 border-b border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/6 font-medium text-gray-900">이름</dt>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                허성지
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/6 font-medium text-gray-900">아이디</dt>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                gjtjdwl
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/6 font-medium text-gray-900">이메일</dt>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                co4331@naver.com
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/6 font-medium text-gray-900">전화번호</dt>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                010-****-4331
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/6 font-medium text-gray-900">직무</dt>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                프론트엔드 팀원
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/6 font-medium text-gray-900">부서코드</dt>
              <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                #CCCCFF
              </dd>
            </div>
          </dl>
        </div>
        <div className="flex justify-center items-center mt-24">
          <button className="bg-customPink w-[200px] text-black font-bold py-2 rounded-lg hover:bg-customPinkHover focus:outline-none">
            내 정보 수정
          </button>
          <button className="bg-customPink w-[200px] text-black font-bold py-2 ml-10 rounded-lg hover:bg-customPinkHover focus:outline-none">
            상담결과
          </button>
        </div>
      </div>
    </div>
  );
}
