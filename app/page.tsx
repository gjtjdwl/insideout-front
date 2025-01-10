'use client';
import React, { useState } from 'react';
import ButtonIcon from './components/ButtonIcon';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { TbChevronCompactDown } from 'react-icons/tb';
import Header from './components/header';
import Footer from './components/footer';

export default function Home() {
  const router = useRouter();
  const [isLogIn, setIsLogIn] = useState<boolean>(false);
  const [role, setRole] = useState<string | null>(null);
  const features = [
    {
      title: '익명성',
      description: '암호화 및 보안 강화를 통해 익명성과 안정성을 확보합니다.',
      icon: '🔒',
    },
    {
      title: '즉시성',
      description: '바로 상담 서비스가 가능하며, 즉각적 효과를 제공합니다.',
      icon: '⏱️',
    },
    {
      title: '접근성',
      description: '원하는 시간과 장소에서 제약 없이 이용 가능합니다.',
      icon: '🙌',
    },
    {
      title: '기술성',
      description: '빅데이터 기술로 시각화, 통계화된 분석을 제공합니다.',
      icon: '📈',
    },
    {
      title: '경제성',
      description: '기업에게 더 합리적인 가격으로 서비스를 제공합니다.',
      icon: '💰',
    },
    {
      title: '전문성',
      description: '엄격한 전문가 선발 및 전문성 관리 시스템을 구축했습니다.',
      icon: '📚',
    },
  ];
  const handleLogin = () => {
    setIsLogIn(true);
    router.push('/login');
    setRole('부서원');
  };
  const handleLogout = () => {
    setIsLogIn(false);
    setRole(null);
  };

  return (
    <>
      <Header />
      <div className=" flex flex-col items-center min-h-screen bg-customPink px-[50px]">
        <div className="flex flex-col items-center bg-white w-[100%]">
          <img src="./mainLogo.png" className="w-54 h-32 mt-24" alt="asdf" />
          <div className="flex flex-col items-center mt-3 mb-32 text-[24px] font-bold">
            <span>당신 안의 작은 목소리들을 만나보세요, Inside Out</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center w-full sm:w-auto mb-80">
            {!isLogIn ? (
              <>
                <div className="sm:mr-20  flex items-center justify-center w-[200px] h-[70px] bg-customPink hover:bg-customPinkHover rounded-full text-[22px] mb-4 sm:mb-0">
                  <button
                    onClick={handleLogin}
                    className="w-full h-[70px] rounded-full pt-[2px]"
                  >
                    로그인
                  </button>
                </div>
                <ButtonIcon
                  label="회원가입"
                  bgColor="bg-white"
                  hoverColor="hover:bg-gray-50"
                  textColor="text-black"
                  width="w-[200px]"
                  onClick={() => {
                    router.push('/register');
                  }}
                />
              </>
            ) : role === '부서장' ? (
              <ButtonIcon
                label="관리자 페이지"
                bgColor="bg-customPink"
                hoverColor="hover:bg-customPinkHover"
                textColor="text-black"
                width="w-[240px]"
                onClick={() => {
                  router.push('/');
                }}
              />
            ) : role === '부서원' ? (
              <ButtonIcon
                label="본부 들어가기 "
                bgColor="bg-customPink"
                hoverColor="hover:bg-customPinkHover"
                textColor="text-black"
                width="w-[240px]"
                onClick={() => {
                  router.push('/');
                }}
              />
            ) : null}
          </div>

          <div
            id="serviceInfo"
            className="bg-customPink py-20 min-w-full mb-20"
          >
            <div className="max-w-7xl flex justify-between gap-16 mx-auto text-center">
              <div className="flex flex-col justify-center text-right">
                <h2 className="text-4xl font-bold mb-4 leading-[3rem]">
                  편한 곳에서, <br />
                  익명으로 <br />
                  신속하게
                </h2>
                <p className="text-gray-700 mb-10 mt-2">
                  익명 커뮤니티 기반으로 즉시성과 접근성을 담보합니다.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow p-6 text-center hover:shadow-lg transition h-full flex flex-col"
                  >
                    <div className="text-4xl mb-4">{feature.icon}</div>
                    <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                    <p className="text-gray-600 break-keep">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="my-14">
            <div className="ml-4 my-20 font-semibold">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{
                  opacity: 1,
                  x: 1,
                  transition: { delay: 0.2 },
                }}
                className="mb-2 text-[40px]"
              >
                InsideOut을 통해,
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{
                  opacity: 1,
                  x: 1,
                  transition: { delay: 0.2 },
                }}
                className="text-[45px]"
              >
                기업과 조직원의 마음은 달라집니다.
              </motion.div>
            </div>
            <div className="flex flex-row mb-40">
              <div className="flex flex-col justify-evenly pb-12 m-4 text-xl font-light">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{
                    opacity: 1,
                    x: 1,
                    transition: { delay: 0.4 },
                  }}
                  className="relative bg-[#d9d9d9] rounded-full flex flex-col justify-center p-9"
                >
                  <div className="absolute w-12 h-12 bg-[#d9d9d9] rounded-full -bottom-4 -right-8"></div>
                  <div className="absolute w-6 h-6 bg-[#d9d9d9] rounded-full -bottom-6 -right-14"></div>
                  <p className=" text-left text-black mb-1">
                    회사에 하고싶은 말을 어떻게 전하지?
                  </p>
                  <p className="text-left text-black mb-1">
                    내 마음... 잘 모르겠어
                  </p>
                  <p className=" text-left text-black">
                    회사에 적응하기가 너무 힘들어
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{
                    opacity: 1,
                    x: 1,
                    transition: { delay: 0.6 },
                  }}
                  className="bg-customPink mt-10 p-7 rounded-tl-[35px] rounded-bl-[35px] rounded-br-[35px] "
                >
                  <p className="text-left text-black mb-1">
                    심리도를 통한 심리 상담 추천
                  </p>
                  <p className="text-left text-black mb-1">자신의 심리 검토</p>
                  <p className="text-left text-black">
                    AI 분석을 통한 심리도 파악
                  </p>
                </motion.div>
              </div>
              <div className="flex flex-row h-[500px]">
                <img
                  className="w-60 h-auto"
                  alt="employee"
                  src="./frame_90.svg"
                />
                <img className="w-60" alt="employer" src="./frame_er.svg" />
              </div>
              <div className="flex flex-col justify-evenly pb-12 m-4 text-xl font-light">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{
                    opacity: 1,
                    x: 1,
                    transition: { delay: 0.4 },
                  }}
                  className="relative bg-[#d9d9d9] rounded-full flex flex-col justify-center p-9 "
                >
                  <div className="absolute w-12 h-12 bg-[#d9d9d9] rounded-full -bottom-4 -left-8"></div>
                  <div className="absolute w-6 h-6 bg-[#d9d9d9] rounded-full -bottom-6 -left-14"></div>
                  <p className="text-left text-black mb-1">
                    조직과의 소통이 안돼요
                  </p>
                  <p className=" text-left text-black">
                    조직이 뭘 원하는지 모르겠어요
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{
                    opacity: 1,
                    x: 1,
                    transition: { delay: 0.6 },
                  }}
                  className="bg-[#deeafa] mt-10 p-7 rounded-br-[35px] rounded-bl-[35px] rounded-tr-[35px]"
                >
                  <p className="text-left text-black mb-1">
                    조직의 심리 변화도 제공
                  </p>
                  <p className="text-left text-black mb-1">
                    AI 요약을 통한 개선방안 제공
                  </p>
                  <p className="text-left text-black">
                    해당 서비스를 통한 근무환경 개선 기대
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
          <div className="relative w-full h-auto aspect-video mb-40 flex items-center justify-center">
            <div className="absolute inset-0 bg-[url('/homeback.jpg')] bg-cover bg-center opacity-60"></div>
            <div className=" max-w-[84rem] flex flex-col justify-around max-h-[1000px] h-[800px]">
              <motion.div
                initial={{ y: -50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{
                  type: 'spring',
                  stiffness: 100,
                  damping: 25,
                  duration: 1.5,
                }}
                className="flex relative items-center justify-start pl-[40px] sm:pl-[80px] sm:mt-10"
              >
                <div className="w-[350px] h-[160px] flex flex-col bg-customPink items-center justify-center rounded-[80px] opacity-85 text-[20px] sm:w-[300px] sm:h-[140px] sm:text-[22px] shadow-lg transition-shadow">
                  <span>ORS </span>
                  <span>(Outcome Rating Scale) </span>
                </div>
                <div className="relative pl-[40px] sm:pl-[80px]">
                  <p className="text-[20px] sm:text-[26px] font-bold text-white ">
                    고객님의 마음 상태와 삶의 질을 평가하며
                    <br />
                    상담 전후의 변화 정도를 측정하여 고객님의 치료 효과를
                    확인합니다.
                  </p>
                </div>
              </motion.div>
              <motion.div
                initial={{ y: -50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{
                  type: 'spring',
                  stiffness: 100,
                  damping: 25,
                  duration: 1.5,
                }}
                className="flex relative items-center justify-end pr-[40px] sm:pr-[80px] sm:mt-0 "
              >
                <div className="relative ">
                  <p className="text-[20px] sm:text-[26px] font-bold text-white text-right">
                    상담에 대한 고객님의 만족도를 평가하며 <br />
                    상담자가 고객님의 경험을 반영하여 질을 향상시킵니다.
                  </p>
                </div>
                <div className="w-[350px] h-[160px] flex flex-col bg-customPink items-center justify-center rounded-[80px] opacity-85 text-[20px] sm:w-[300px] sm:h-[140px] sm:text-[22px]  ml-[40px] sm:ml-[80px] shadow-lg transition-shadow">
                  <span>SRS </span>
                  <span>(Session Rating Scale) </span>
                </div>
              </motion.div>

              <div>
                <motion.div
                  initial={{ y: 0 }}
                  animate={{
                    y: [0, 10, 0],
                    opacity: [1, 0.5, 1],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.0,
                    ease: 'easeInOut',
                  }}
                  className="absolute bottom-8 left-1/2 ml-[-50px]"
                >
                  <TbChevronCompactDown size={100} color="#FADEE1" />
                </motion.div>
              </div>
            </div>
          </div>

          {/* <div> */}
          {/* 제목 */}
          <h1 className="text-4xl font-bold mb-12 text-center">
            Inside Out과 함께하면서, <br />
            <span className="text-[#3F75FF]">기대되는 것들</span>
          </h1>

          {/* 메인 콘텐츠 */}
          <div className="flex items-center justify-center relative w-full max-w-6xl">
            {/* 왼쪽 텍스트 */}
            <motion.div
              initial={{ opacity: 0, x: -80 }}
              whileInView={{ opacity: 1.0, x: 0 }}
              transition={{ duration: 1.5 }}
              className="flex flex-col space-y-10 text-xl font-medium w-[300px]"
            >
              {' '}
              {/*초기상태 투명하게 왼쪽에서 80 이동 / 화면에 보일때 완전히, 원래위치 / 전환 시간 1.5초 */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-r from-[#FFE9A8] to-[#FFE9A8] p-8 rounded-[30px] shadow-lg  hover:shadow-xl transition-shadow"
              >
                <div className="relative">
                  <div className="text-[#2C2C2C] text-2xl font-semibold mb-2">
                    업무 생산성
                  </div>
                  <div className="text-3xl font-bold text-[#4D82FF]">43% 🠕</div>
                  <div className="text-[18px] text-[#836900] mt-2">
                    업무 효율성 증가
                  </div>
                </div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-r from-[#FAD4AE] to-[#FAD4AE] p-8 rounded-[30px] shadow-lg  hover:shadow-xl transition-shadow"
              >
                <div className="relative">
                  <div className="text-[#2c2c2c] text-2xl font-semibold mb-2">
                    근무 태도
                  </div>
                  <div className="text-3xl font-bold text-[#4D82FF]">36% 🠕</div>
                  <div className="text-[18px] text-[#FF8000] mt-2">
                    업무 만족도 향상
                  </div>
                </div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-r from-[#FDAFAB] to-[#FDAFAB] p-8 rounded-[30px] shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="relative">
                  <div className="text-[#2c2c2c] text-2xl font-semibold mb-2">
                    업무 동기
                  </div>
                  <div className="text-3xl font-bold text-[#4D82FF]">50% 🠕</div>
                  <div className="text-[18px] text-[#FF3A30] mt-2">
                    자발적 참여도 증가
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* 이미지/애니메이션 영역 */}
            <div className="relative w-[450px] h-[600px] bg-white shadow-lg rounded-lg p-6 mx-8">
              <div className="w-full h-full flex flex-col justify-between">
                {/* 채팅 예시 */}
                <div className="flex flex-col gap-4">
                  {/* 공지 텍스트 */}
                  <div className="bg-[#DEF3FA] text-[#0773A1] text-sm p-4 rounded-xl whitespace-normal">
                    반갑습니다. 지금 하는 대화는 공개되지 않으니 편하게 속마음을
                    얘기해 보세요.
                  </div>

                  {/* 대화 내용 - 핵심 대화만 유지 */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-10 h-10 rounded-full bg-white border flex-shrink-0 flex justify-center items-center text-white text-xl font-bold">
                      🤗
                    </div>
                    <div className="bg-gray-100 px-6 py-3 mt-4 rounded-tr-3xl rounded-bl-3xl rounded-br-3xl max-w-[75%] whitespace-normal break-words">
                      안녕, 내 이름은 마음이야. 네 이름은 뭐야?
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex items-start justify-end gap-4"
                  >
                    <div className="bg-customPink px-6 py-3 mt-4 rounded-tl-3xl rounded-bl-3xl rounded-br-3xl max-w-[75%] whitespace-normal break-words">
                      안녕 난 성미야 😊
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white border flex-shrink-0 flex justify-center items-center text-white text-2xl font-bold">
                      🐰
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-10 h-10 rounded-full bg-white border flex-shrink-0 flex justify-center items-center text-white text-xl font-bold">
                      🤗
                    </div>
                    <div className="bg-gray-100 px-6 py-3 mt-4 rounded-tr-3xl rounded-bl-3xl rounded-br-3xl max-w-[75%] whitespace-normal break-words">
                      안녕, 성미야. 요즘 무슨 고민이 있어?
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="flex items-start justify-end gap-4"
                  >
                    <div className="bg-customPink px-6 py-3 mt-4 rounded-tl-3xl rounded-bl-3xl rounded-br-3xl max-w-[75%] whitespace-normal break-words">
                      연애는 어떻게 하는거야?
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white border flex-shrink-0 flex justify-center items-center text-2xl text-white font-bold">
                      🐰
                    </div>
                  </motion.div>
                </div>

                {/* 채팅 입력창 */}
                <div className="mt-auto border-t pt-4">
                  <div className="flex gap-2 h-12">
                    <input
                      type="text"
                      placeholder="메시지를 입력하세요..."
                      className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-pink-300"
                      disabled
                    />
                    <button className="bg-customPink text-black px-6 py-3 rounded-xl transition-colors">
                      전송
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* 오른쪽 텍스트 */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="flex flex-col space-y-10 text-xl font-medium w-[300px]"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-r from-[#FFD0E4] to-[#FFD0E4] p-8 rounded-[30px] shadow-lg  hover:shadow-xl transition-shadow"
              >
                <div className="relative">
                  <div className="text-[#2c2c2c] text-2xl font-semibold mb-2">
                    감정 건강
                  </div>
                  <div className="text-3xl font-bold text-[#4D82FF]">86% 🠕</div>
                  <div className="text-[18px] text-[#FC5F70] mt-2">
                    정서적 안정감 향상
                  </div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-r from-[#E4FFB4] to-[#E4FFB4] p-8 rounded-[30px] shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="relative">
                  <div className="text-[#2c2c2c] text-2xl font-semibold mb-2">
                    일상 생활
                  </div>
                  <div className="text-3xl font-bold text-[#4D82FF]">45% 🠕</div>
                  <div className="text-[18px] text-[#58830D] mt-2">
                    생활 만족도 개선
                  </div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-r from-[#B6E3E9] to-[#B6E3E9] p-8 rounded-[30px] shadow-lg  hover:shadow-xl transition-shadow"
              >
                <div className="relative">
                  <div className="text-[#2c2c2c] text-2xl font-semibold mb-2">
                    신체 건강
                  </div>
                  <div className="text-3xl font-bold text-[#4D82FF]">15% 🠕</div>
                  <div className="text-[18px] text-[#68888C] mt-2">
                    건강 지표 개선
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* 출처 */}
          <p className="mt-12 text-gray-500 text-base pb-36">
            EAP 도입 효과 (출처: Flanagan & Ots 2017)
          </p>
          {/* </div> */}
        </div>
      </div>
      <Footer />
    </>
  );
}
