import { RiMailSendFill } from 'react-icons/ri';

export default function feedback() {
  const products = [
    {
      main: '개선사항1',
      sub: [
        '탕비실에 과자가 없다 채워달라',
        '과자는 사브레 초코크렘이 좋겠다',
        '사브레 초코크렘은 맛있다',
        '얼려먹으면 더 맛있다',
        '이상이다',
      ],
    },
    {
      main: '개선사항2',
      sub: [
        '괴롭힘을 당하고 있다',
        '신변보호를 요청한다',
        '괴롭히는 상대는 바로 김상사',
        '김상사 죽어',
        '이상이다',
      ],
    },
    {
      main: '',
      sub: ['개선사항을 수집중입니다! ', '조금만 기다려 주세요~'],
    },
  ];
  return (
    <div className="bg-customPink px-4 sm:px-[50px]">
      <div className="items-center bg-white w-full p-10 min-h-[50vh]">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="font-bold text-xl md:text-3xl">개선 사항</div>
        </div>
        <div className="flex justify-center flex-col items-center ">
          <div className="m-6 mt-28 max-w-[1200px] grid grid-cols-1 gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-20">
            {products.map((product, index) => (
              <div
                key={product.main}
                className="group relative p-6 border rounded-lg"
              >
                <div className="flex flex-col justify-between mb-8">
                  <div className="mb-10 flex justify-center">
                    {index === products.length - 1 ? (
                      <RiMailSendFill size={32} />
                    ) : (
                      <p className="text-xl md:text-2xl font-semibold">
                        {product.main}
                      </p>
                    )}
                  </div>
                  {products[index].sub.map((content, i) => (
                    <div key={i} className="my-2">
                      • {content}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="min-h-60 pt-24">
            <button className="w-[270px] p-3 rounded-lg max-w-[270px] min-w-[50px] bg-[#757575] text-white text-sm md:text-base">
              이전 개선사항 보기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
