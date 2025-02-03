'use client';

import React, { useState, useEffect } from 'react';
import { AuthAPI } from '../../api';
import { useRouter } from 'next/navigation';
import {
  RegisterFormData,
  RegisterFormErrors,
  UserRole,
} from '../../types/auth';
import SuccessModal from '../../components/SuccessModal';
import { FiChevronLeft } from 'react-icons/fi';
import axios from 'axios';
import AgreementModal from '../../components/AgreementModal';

const Register = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<RegisterFormData>({
    name: '',
    email: '',
    phoneNumber: '',
    role: '' as UserRole,
    userId: '',
    passwordHash: '',
    confirmPassword: '',
    department: '',
    deptCode: '',
  });
  const [passwordError, setPasswordError] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [errors, setErrors] = useState({
    userId: '',
    passwordHash: '',
    email: '',
  });
  const [agreements, setAgreements] = useState({
    terms: false,
    privacy: false,
  });
  const [modalState, setModalState] = useState({
    isOpen: false,
    type: '' as 'terms' | 'privacy',
  });

  useEffect(() => {
    if (showSuccessModal && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (showSuccessModal && countdown === 0) {
      router.push('/login');
    }
  }, [showSuccessModal, countdown, router]);

  const validateField = (name: string, value: string) => {
    switch (name) {
      case 'userId':
        const userIdRegex = /^[a-z0-9]{4,12}$/;
        return userIdRegex.test(value)
          ? ''
          : '아이디는 영어 소문자와 숫자 4~12자리여야 합니다';

      case 'passwordHash':
        const passwordRegex =
          /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,32}$/;
        return passwordRegex.test(value)
          ? ''
          : '비밀번호는 영문자, 숫자, 특수문자를 각각 1개 이상 포함하고 8~32자여야 합니다.';

      case 'email':
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(value) ? '' : '유효하지 않는 이메일 형식입니다.';

      default:
        return '';
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    let filterNum = value;
    if (name === 'phoneNumber') {
      const numbers = value.replace(/\D/g, '');
      // 하이픈 추가
      if (numbers.length <= 3) {
        filterNum = numbers;
      } else if (numbers.length <= 7) {
        filterNum = `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
      } else {
        filterNum = `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
      }
    }
    setFormData((prev) => ({
      ...prev,
      [name]: filterNum,
      ...(name === 'role' && {
        department: '',
        deptCode: '',
      }),
    }));

    if (name === 'passwordHash' || name === 'confirmPassword') {
      if (name === 'confirmPassword' && value !== formData.passwordHash) {
        setPasswordError('비밀번호가 일치하지 않습니다.');
      } else if (
        name === 'passwordHash' &&
        value !== formData.confirmPassword &&
        formData.confirmPassword
      ) {
        setPasswordError('비밀번호가 일치하지 않습니다.');
      } else {
        setPasswordError('');
      }
    }

    if (['userId', 'passwordHash', 'email'].includes(name)) {
      const error = validateField(name, value);
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 역할 선택 필수 체크 추가
    if (!formData.role) {
      alert('직책을 선택해주세요.');
      return;
    }

    if (formData.passwordHash !== formData.confirmPassword) {
      setPasswordError('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (formData.role === 'MANAGER' && !formData.department) {
      alert('부서 이름을 입력해주세요.');
      return;
    }

    if (formData.role === 'USER' && !formData.deptCode) {
      alert('부서 코드를 입력해주세요.');
      return;
    }

    try {
      // RegisterRequestData 형식에 맞게 데이터 정제
      const requestData = {
        userId: formData.userId,
        name: formData.name,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        role: formData.role as UserRole,
        passwordHash: formData.passwordHash,
        department: formData.department,
        deptCode: formData.deptCode,
      };

      const response = await AuthAPI.register(requestData);
      setShowSuccessModal(true);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        alert(
          error.response?.data?.message || '회원가입 중 오류가 발생했습니다.'
        );
      } else {
        alert('회원가입 중 오류가 발생했습니다.');
      }
    }
  };

  const handleModalOpen = (type: 'terms' | 'privacy') => {
    setModalState({ isOpen: true, type });
  };

  const handleModalClose = () => {
    setAgreements((prev) => ({
      ...prev,
      [modalState.type]: true,
    }));
    setModalState({ ...modalState, isOpen: false });
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    router.push('/login');
  };

  const isFormValid = () => {
    const baseFieldsValid =
      formData.name.trim() !== '' &&
      formData.email.trim() !== '' &&
      formData.phoneNumber.trim() !== '' &&
      formData.userId.trim() !== '' &&
      formData.passwordHash.trim() !== '' &&
      formData.confirmPassword.trim() !== '' &&
      Boolean(formData.role) &&
      formData.passwordHash === formData.confirmPassword &&
      !errors.userId &&
      !errors.passwordHash &&
      !errors.email &&
      agreements.terms &&
      agreements.privacy;

    if (formData.role === 'MANAGER') {
      return baseFieldsValid && formData.department.trim() !== '';
    }
    if (formData.role === 'USER') {
      return baseFieldsValid && formData.deptCode.trim() !== '';
    }
    return baseFieldsValid;
  };

  const handleAgreementChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setAgreements((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const getModalContent = () => {
    if (modalState.type === 'terms') {
      return (
        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">제 1조 목적</h2>
            <p>
              본 약관은 회원(본 약관에 동의한 자를 말하며 이하
              &quot;회원&quot;이라고 합니다)이 인사이드 아웃(InsideOut) 또는
              (이하 &quot;회사&quot;라고 합니다)가 제공하는 서비스를 이용함에
              있어 회사와 회원의 권리 의무 및 책임사항을 규정함을 목적으로
              합니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">제 2조 정의</h2>
            <p>이 약관에서 사용하는 용어의 정의는 다음과 같습니다.</p>
            <ul className="list-disc list-inside ml-4">
              <li>
                &quot;회원&quot;이라 함은 회사의 서비스에 접속하여 이 약관에
                따라 &quot;회사&quot;와 이용계약을 체결하고 &quot;회사&quot;가
                제공하는 &quot;서비스&quot;를 이용하는 고객을 말합니다.
              </li>
              <li>
                &quot;해지&quot;라 함은 회사 또는 회원이 서비스 개통 후
                이용계약을 해약하는 것을 말합니다.
              </li>
              <li>
                아이디(ID)라 함은 &quot;회원&quot;의 식별과 &quot;서비스&quot;
                이용을 위하여 &quot;회원&quot;이 정하고 &quot;회사&quot;가
                승인하는 문자와 숫자의 조합을 말합니다.
              </li>
              <li>
                &quot;게시물&quot;이라 함은 &quot;회원&quot;이
                &quot;서비스&quot;를 이용함에 있어 &quot;서비스상&quot;에 게시한
                부호·문자·음성·음향·화상·동영상 등의 정보 형태의 글, 사진,
                동영상 및 각종 파일과 링크 등을 말합니다.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              제 3조 개인정보보호 의무
            </h2>
            <p>
              &quot;회사&quot;는 &quot;정보통신망법&quot; 등 관계 법령이 정하는
              바에 따라 &quot;회원&quot;의 &quot;개인정보&quot;를 보호하기 위해
              노력합니다. &quot;개인정보&quot;의 보호 및 사용에 대해서는 관련법
              및 &quot;회사&quot;의 개인정보보호정책이 적용됩니다. 다만,
              &quot;회사&quot;의 공식 사이트 이외의 링크된 사이트에서는
              &quot;회사&quot;의 개인정보보호정책이 적용되지 않습니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              제 4조 약관의 게시와 개정
            </h2>
            <p>
              &quot;회사&quot;는 이 약관의 내용을 &quot;회원&quot;이 쉽게 알 수
              있도록 초기화면에 게시합니다. &quot;회사&quot;는
              &quot;약관의규제에관한법률&quot;,
              &quot;정보통신망이용촉진및정보보호에관한법률(이하
              &quot;정보통신망법&quot;)&quot; 등 관련법을 위배하지 않는 범위에서
              이 약관을 개정할 수 있습니다.
            </p>
            <p>
              &quot;회사&quot;가 약관을 개정할 경우에는 적용일자 및 개정사유를
              명시하여 현행약관과 함께 제1항의 방식에 따라 그 개정약관의
              적용일자 30일 전부터 적용일자 전일까지 공지합니다. 다만, 회원에게
              불리한 내용으로 약관을 개정하는 경우에는 공지 외에 회원정보에
              등록된 이메일 등 전자적 수단을 통해 별도로 명확히 통지하도록
              합니다.
            </p>
            <p>
              &quot;회사&quot;가 전항에 따라 공지하면서 회원에게 30일 기간
              이내에 의사표시를 하지 않으면 승인한 것으로 본다는 뜻을 명확하게
              공지하였음에도 회원이 명시적으로 거부의사를 밝히지 않은 경우에
              회원이 개정약관에 동의한 것으로 봅니다.
            </p>
            <p>
              &quot;회원&quot;이 개정약관에 동의하지 않는 경우 회사는 개정약관의
              내용을 적용할 수 없으며, 이 경우 회원은 이용계약을 해지할 수
              있습니다. 다만, 기존 약관을 적용할 수 없는 특별한 사정이 있는
              경우에는 회사는 이용계약을 해지할 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              제 5조 권리의 귀속 및 저작물의 이용
            </h2>
            <p>
              회사가 회원에게 제공하는 각종 서비스에 대한 저작권을 포함한 일체의
              권리는 회사에 귀속되며 회원이 서비스를 이용하는 과정에서 작성한
              게시물 등(이하 &quot;게시물 등&quot;이라 합니다)에 대한 저작권을
              포함한 일체에 관한 권리는 별도의 의사표시가 없는 한 각 회원에게
              귀속됩니다.
            </p>
            <p>
              게시물 등은 회사가 운영하는 인터넷 사이트 및 모바일 어플리케이션을
              통해 노출될 수 있으며, 검색결과 내지 관련 프로모션 등에도 노출될
              수 있습니다. 또한, 해당 노출을 위해 필요한 범위 내에서는 일부
              수정, 편집되어 게시될 수 있습니다. 이 경우, 회사는 저작권법 규정을
              준수하며, 회원은 언제든지 고객센터 또는 각 서비스 내 관리기능을
              통해 해당 게시물 등에 대해 삭제, 검색결과 제외, 비공개 등의 조치를
              취할 수 있습니다.
            </p>
            <p>
              회사는 제2항 이외의 방법으로 회원의 게시물 등을 이용하고자 하는
              경우에는 전화, 팩스, 전자우편 등을 통해 사전에 회원의 동의를
              얻습니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              제 6조 서비스의 변경, 중단, 일시 중지
            </h2>
            <p>
              회사는 서비스의 일부 또는 전부를 회사의 사업 계획 및 서비스
              운영정책에 따라 수정·변경 및 중단할 수 있으며, 이에 대하여 관련
              법령에 특별한 규정이 없는 한 회원에게 별도의 보상을 하지 않습니다.
            </p>
            <p>
              회사는 서비스용 설비 점검·보수·공사 및 기간통신사업자의 전기통신
              서비스의 중지, 서비스 이용의 폭주나 국가비상사태 등을 사유로
              서비스 제공에 장애가 발생한 경우 그 사유가 해소될 때까지 서비스를
              일시 중지할 수 있습니다.
            </p>
            <p>
              회사는 본 조에 따른 서비스의 변경·중단·일시 중지의 사유가 발생한
              경우, 서비스를 통해 공지하는 등의 방법으로 회원에게 통지합니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              제 7조 &quot;회원&quot;에 대한 통지
            </h2>
            <p>
              &quot;회사&quot;가 &quot;회원&quot;에 대한 통지를 하는 경우 본
              약관에 별도 규정이 없는 한 &quot;회원&quot;이 지정한 전자우편주소,
              알림 메시지 등으로 할 수 있습니다.
            </p>
            <p>
              &quot;회사&quot;는 &quot;회원&quot; 전체에 대한 통지의 경우 7일
              이상 &quot;회사&quot;의 공지사항 페이지에 게시함으로써 제1항의
              통지에 갈음할 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">제 8조 이용제한 등</h2>
            <p>
              &quot;회사&quot;는 &quot;회원&quot;이 본 약관의 의무를 위반하거나
              서비스의 정상적인 운영을 방해한 경우, 서비스 이용을 경고,
              일시정지, 계약해지로 단계적으로 제한할 수 있습니다.
            </p>
            <p>
              &quot;회사&quot;는 전항에도 불구하고, &quot;저작권법&quot; 및
              &quot;컴퓨터프로그램보호법&quot;을 위반한 불법프로그램의 제공 및
              운영방해, &quot;정보통신망법&quot;을 위반한 불법통신 및 해킹,
              악성프로그램의 배포, 접속권한 초과행위 등과 같이 관련법을 위반한
              경우에는 즉시 계약해지를 할 수 있습니다. 본 항에 따른 계약해지 시
              서비스 이용을 통해 획득한 혜택 등도 모두 소멸되며, 회사는 이에
              대해 별도로 보상하지 않습니다.
            </p>
            <p>
              &quot;회사&quot;는 회원이 계속해서 3개월 이상 로그인하지 않는
              경우, 회원정보의 보호 및 운영의 효율성을 위해 이용을 제한할 수
              있습니다.
            </p>
            <p>
              회사는 본 조의 이용제한 범위 내에서 제한의 조건 및 세부내용은
              이용제한정책 등에서 정한 바에 따릅니다. 본 조에 따라 서비스 이용을
              제한하거나 계약을 해지하는 경우에는 &quot;회사&quot;는
              &quot;회원&quot;에 대한 통지&quot;에 따라 통지합니다.
            </p>
            <p>
              &quot;회원&quot;은 본 조에 따른 이용제한 등에 대해
              &quot;회사&quot;가 정한 절차에 따라 이의신청을 할 수 있습니다. 이
              때 이의가 정당하다고 회사가 인정하는 경우 회사는 즉시 서비스의
              이용을 재개합니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              제 9조 게시물의 관리
            </h2>
            <p>
              &quot;회원&quot;의 게시물이 &quot;정보통신망법&quot; 및
              &quot;저작권법&quot; 등 관련법에 위반되는 내용을 포함하는 경우,
              권리자는 관련법이 정한 절차에 따라 해당 게시물의 게시중단 및 삭제
              등을 요청할 수 있으며, &quot;회사&quot;는 관련법에 따라 조치를
              취하여야 합니다.
            </p>
            <p>
              &quot;회사&quot;는 전항에 따른 권리자의 요청이 없는 경우라도
              권리침해가 인정될 만한 사유가 있거나 기타 회사 정책 및 관련법에
              위반되는 경우에는 관련법에 따라 해당 게시물에 대해 임시조치 등을
              취할 수 있습니다. 본 조에 따른 세부절차는 &quot;정보통신망법&quot;
              및 &quot;저작권법&quot;이 규정한 범위 내에서 회사가 정한
              게시중단요청서비스에 따릅니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">제 10조 권리의 귀속</h2>
            <p>
              &quot;서비스&quot;에 대한 저작권 및 지적재산권은 회사에
              귀속됩니다. 단, 회원의 게시물 및 제휴계약에 따라 제공된 저작물
              등은 제외합니다.
            </p>
            <p>
              &quot;회사&quot;는 서비스와 관련하여 회원에게 회사가 정한
              이용조건에 따라 계정, 아이디, 콘텐츠 등을 이용할 수 있는
              이용권만을 부여하며, &quot;회원&quot;은 이를 양도, 판매, 담보제공
              등의 처분행위를 할 수 없습니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">제 11조 책임제한</h2>
            <p>
              &quot;회사&quot;는 천재지변 또는 이에 준하는 불가항력으로 인하여
              &quot;서비스&quot;를 제공할 수 없는 경우에는 &quot;서비스&quot;
              제공에 관한 책임이 면제됩니다.
            </p>
            <p>
              &quot;회사&quot;는 &quot;회원&quot;의 귀책사유로 인한 서비스
              이용의 장애에 대하여는 책임을 지지 않습니다.
            </p>
            <p>
              &quot;회사&quot;는 &quot;회원&quot;이 &quot;서비스&quot;와
              관련하여 게재한 정보, 자료, 사실의 신뢰도, 정확성 등의 내용에
              관하여는 책임을 지지 않습니다.
            </p>
            <p>
              &quot;회사&quot;는 &quot;회원&quot; 간 또는 &quot;회원&quot;과
              제3자 상호간에 &quot;서비스&quot;를 매개로 하여 거래 등을 한
              경우에는 책임이 면제됩니다.
            </p>
            <p>
              &quot;회사&quot;는 무료로 제공되는 서비스 이용과 관련하여 관련법에
              특별한 규정이 없는 한 책임을 지지 않습니다.
            </p>
            <br />
            <p>(시행일) 본 약관은 2025년 1월 22일부터 적용됩니다.</p>
          </section>
        </div>
      );
    }
    return (
      <div className="space-y-6">
        <section>
          <p className="text-gray-600 mb-4">
            인사이드 아웃(InsideOut, 이하 &lsquo;회사&rsquo;라 함)는 고객님의
            개인정보를 중요시하며, &ldquo;정보통신망 이용촉진 및
            정보보호&rdquo;에 관한 법률을 준수하고 있습니다. 회사는
            개인정보취급방침을 통하여 고객님께서 제공하시는 개인정보가 어떠한
            용도와 방식으로 이용되고 있으며, 개인정보보호를 위해 어떠한 조치가
            취해지고 있는지 알려드립니다. 회사는 개인정보취급방침을 개정하는
            경우 웹사이트 공지사항(또는 개별공지)을 통하여 공지할 것입니다. 본
            개인정보취급방침은 회사가 제공하는 인사이드 아웃(InsideOut) 서비스
            이용에 적용되며 다음과 같은 내용을 담고 있습니다.
          </p>

          <p className="text-sm text-gray-500">
            본 방침은 2025년 1월 22일부터 시행됩니다.
          </p>
          <h2 className="text-2xl font-semibold mt-6">
            수집하는 개인정보 항목
          </h2>
          <p>
            회사는 회원가입, 상담, 서비스 신청 등을 위해 아래와 같은 개인정보를
            수집하고 있습니다.
          </p>
          <ul className="list-disc list-inside ml-4">
            <li>
              수집항목: 접속 지역, 서비스 이용기록, 접속 로그, 쿠키, 접속 IP
              정보
            </li>
            <li>개인정보 수집방법: 홈페이지(회원가입)</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-6">
            개인정보의 수집 및 이용목적
          </h2>
          <p>회사는 수집한 개인정보를 다음의 목적을 위해 활용합니다.</p>
          <ul className="list-disc list-inside ml-4">
            <li>
              회원 관리: 회원제 서비스 이용에 따른 본인확인, 개인 식별,
              불량회원의 부정 이용 방지와 비인가 사용 방지, 가입 의사 확인,
              연령확인
            </li>
            <li>
              마케팅 및 광고에 활용: 신규 서비스(제품) 개발 및 특화, 이벤트 등
              광고성 정보 전달, 인구통계학적 특성에 따른 서비스 제공 및 광고
              게재, 접속 빈도 파악 또는 회원의 서비스 이용에 대한 통계
            </li>
          </ul>

          <h2 className="text-2xl font-semibold mt-6">
            개인정보의 보유 및 이용기간
          </h2>
          <p>
            원칙적으로, 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를
            지체 없이 파기합니다.
          </p>
          <ul className="list-disc list-inside ml-4"></ul>

          <h2 className="text-2xl font-semibold mt-6">
            개인정보의 파기절차 및 방법
          </h2>
          <p>
            회사는 원칙적으로 개인정보 수집 및 이용목적이 달성된 후에는 해당
            정보를 지체 없이 파기합니다. 파기절차 및 방법은 다음과 같습니다.
          </p>
          <ul className="list-disc list-inside ml-4">
            <li>
              파기절차: 회원님이 회원가입 등을 위해 입력하신 정보는 목적이
              달성된 후 별도의 DB로 옮겨져 내부 방침 및 기타 관련 법령에 의한
              정보보호 사유에 따라 일정 기간 저장된 후 파기됩니다.
            </li>
            <li>
              파기방법: 전자적 파일형태로 저장된 개인정보는 기록을 재생할 수
              없는 기술적 방법을 사용하여 삭제합니다.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold mt-6">개인정보 제공</h2>
          <p>
            회사는 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다.
            다만, 아래의 경우에는 예외로 합니다.
          </p>
          <ul className="list-disc list-inside ml-4">
            <li>이용자들이 사전에 동의한 경우</li>
            <li>
              법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와
              방법에 따라 수사기관의 요구가 있는 경우
            </li>
          </ul>

          <h2 className="text-2xl font-semibold mt-6">
            수집한 개인정보의 위탁
          </h2>
          <p>
            회사는 고객님의 동의 없이 고객님의 정보를 외부 업체에 위탁하지
            않습니다. 향후 그러한 필요가 생길 경우, 위탁 대상자와 위탁 업무
            내용에 대해 고객님에게 통지하고 필요한 경우 사전 동의를 받도록
            하겠습니다.
          </p>

          <h2 className="text-2xl font-semibold mt-6">
            이용자 및 법정대리인의 권리와 그 행사방법
          </h2>
          <p>
            이용자는 언제든지 등록되어 있는 자신의 개인정보를 조회하거나 수정할
            수 있으며 가입 해지를 요청할 수도 있습니다.
          </p>
          <p>
            개인정보관리책임자에게 이메일로 연락하시면 지체 없이 조치하겠습니다.
          </p>

          <h2 className="text-2xl font-semibold mt-6">
            개인정보 자동수집 장치의 설치, 운영 및 그 거부에 관한 사항
          </h2>
          <p>
            회사는 귀하의 정보를 수시로 저장하고 찾아내는
            &lsquo;쿠키(cookie)&rsquo; 등을 운용합니다. 쿠키란 회사의 웹사이트를
            운영하는데 이용되는 서버가 귀하의 브라우저에 보내는 아주 작은 텍스트
            파일로서 귀하의 컴퓨터 하드디스크에 저장됩니다. 회사는 다음과 같은
            목적을 위해 쿠키를 사용합니다.
          </p>
          <p>
            ▶ 쿠키 등 사용 목적: 회원과 비회원의 접속 빈도나 방문 시간 등을
            분석, 이용자의 취향과 관심분야를 파악 및 자취 추적, 각종 이벤트 참여
            정도 및 방문 회수 파악 등을 통한 타겟 마케팅 및 개인 맞춤 서비스
            제공
          </p>

          <h2 className="text-2xl font-semibold mt-6">
            개인정보에 관한 민원서비스
          </h2>
          <p>
            회사는 고객의 개인정보를 보호하고 개인정보와 관련한 불만을 처리하기
            위하여 아래와 같이 관련 부서 및 개인정보관리책임자를 지정하고
            있습니다.
          </p>
          <p>담당자: 감정본부 개인정보보호책임자</p>
          <p>이메일: emotionhq11@gmail.com</p>
          <p>
            귀하께서는 회사의 서비스를 이용하시며 발생하는 모든 개인정보보호
            관련 민원을 개인정보관리책임자 혹은 담당부서로 신고하실 수 있습니다.
            회사는 이용자들의 신고사항에 대해 신속하게 충분한 답변을 드릴
            것입니다.
          </p>
          <p>
            기타 개인정보침해에 대한 신고나 상담이 필요하신 경우에는 아래 기관에
            문의하시기 바랍니다. <br />
            1. 개인분쟁조정위원회 (www.1336.or.kr/1336) <br />
            2. 정보보호마크인증위원회 (www.eprivacy.or.kr/02-580-0533~4) <br />
            3. 대검찰청 인터넷범죄수사센터 (http://icic.sppo.go.kr/02-3480-3600){' '}
            <br />
            4. 경찰청 사이버테러대응센터 (www.ctrc.go.kr/02-392-0330)
          </p>
        </section>
      </div>
    );
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-customPink">
      <form
        onSubmit={handleSubmit}
        className="relative bg-white shadow-md rounded-lg p-12 w-full max-w-6xl"
      >
        <FiChevronLeft
          type="button"
          cursor={'pointer'}
          onClick={() => router.back()}
          className="absolute text-xl md:text-2xl top-5 left-4 text-gray-600 hover:text-gray-900"
        />

        <h1 className="text-center text-xl md:text-3xl font-bold mb-8">
          회원가입
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* 왼쪽 입력 필드 */}
          <div>
            <label htmlFor="name" className="block text-sm font-bold mb-2">
              이름 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="이름을 입력해주세요"
              className="w-full border rounded-md p-2 placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-[#FF82AA]"
              required
            />
            <label
              htmlFor="email"
              className="block text-sm font-bold mb-2 mt-4"
            >
              이메일 <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="이메일을 입력해주세요"
              className="w-full border rounded-md p-2 placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-[#FF82AA]"
              required
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
            <label
              htmlFor="phone"
              className="block text-sm font-bold mb-2 mt-4"
            >
              전화번호 <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="' - ' 없이 전화번호를 입력해주세요"
              className="w-full border rounded-md p-2 placeholder:text-xs sm:placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-[#FF82AA]"
              required
              maxLength={13}
            />
            <label className="block text-sm font-bold mb-2 mt-4">
              직책 <span className="text-red-500">*</span>
            </label>
            <div className="flex space-x-4 text-sm sm:text-base">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="role"
                  value="MANAGER"
                  onChange={handleChange}
                  className="mr-2"
                  checked={formData.role === 'MANAGER'}
                  required
                />
                부서장
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="role"
                  value="USER"
                  onChange={handleChange}
                  className="mr-2"
                  checked={formData.role === 'USER'}
                  required
                />
                부서원
              </label>
            </div>

            {/* 동적 입력 필드 */}
            {formData.role === 'MANAGER' && (
              <div className="mt-4">
                <label
                  htmlFor="department"
                  className="block text-sm font-bold mb-2"
                >
                  부서 이름 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  placeholder="부서 이름을 입력해주세요"
                  className="w-full border rounded-md p-2 placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-[#FF82AA]"
                  required
                />
              </div>
            )}
            {formData.role === 'USER' && (
              <div className="mt-4">
                <label
                  htmlFor="departmentCode"
                  className="block text-sm font-bold mb-2"
                >
                  부서 코드 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="deptCode"
                  name="deptCode"
                  value={formData.deptCode}
                  onChange={handleChange}
                  placeholder="부서 코드를 입력해주세요"
                  className="w-full border rounded-md p-2 placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-[#FF82AA]"
                  required
                />
              </div>
            )}
          </div>

          {/* 오른쪽 입력 필드 */}
          <div>
            <label htmlFor="user_id" className="block text-sm font-bold mb-2">
              아이디 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="userId"
              name="userId"
              value={formData.userId}
              onChange={handleChange}
              placeholder="아이디를 입력해주세요"
              className="w-full border rounded-md p-2 placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-[#FF82AA]"
              required
            />
            {errors.userId && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.userId}</p>
            )}

            <label
              htmlFor="password"
              className="block text-sm font-bold mb-2 mt-4"
            >
              비밀번호 <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              id="passwordHash"
              name="passwordHash"
              value={formData.passwordHash}
              onChange={handleChange}
              placeholder="비밀번호를 입력해주세요"
              className="w-full border rounded-md p-2 placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-[#FF82AA]"
              required
            />
            {errors.passwordHash && (
              <p className="text-red-500 text-xs mt-1 whitespace-pre-line">
                {errors.passwordHash}
              </p>
            )}

            <label
              htmlFor="confirmPassword"
              className="block text-sm font-bold mb-2 mt-4"
            >
              비밀번호 확인 <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="비밀번호를 한 번 더 입력해주세요"
              className="w-full border rounded-md p-2 placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-[#FF82AA]"
              required
            />
            {passwordError && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">{passwordError}</p>
            )}
          </div>
        </div>

        {/* 약관 동의 섹션 추가 */}
        <div className="mt-8 border-t pt-6">
          <h3 className="text-lg font-semibold mb-4">약관 동의</h3>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  checked={agreements.terms}
                  onChange={handleAgreementChange}
                  className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3">
                <label htmlFor="terms" className="font-medium text-gray-700">
                  서비스 이용약관 동의 <span className="text-red-500">*</span>
                </label>
                <p className="text-gray-500 text-sm">
                  <button
                    type="button"
                    onClick={() => handleModalOpen('terms')}
                    className="text-pink-600 hover:text-pink-800 underline"
                  >
                    약관 보기
                  </button>
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="privacy"
                  name="privacy"
                  type="checkbox"
                  checked={agreements.privacy}
                  onChange={handleAgreementChange}
                  className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3">
                <label htmlFor="privacy" className="font-medium text-gray-700">
                  개인정보 수집 및 이용 동의{' '}
                  <span className="text-red-500">*</span>
                </label>
                <p className="text-gray-500 text-sm">
                  <button
                    type="button"
                    onClick={() => handleModalOpen('privacy')}
                    className="text-pink-600 hover:text-pink-800 underline"
                  >
                    약관 보기
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={!isFormValid()}
          className={`w-full font-bold py-2 px-4 rounded-md mt-6 ${
            isFormValid()
              ? 'bg-customPink text-black hover:bg-customPinkHover'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          회원가입
        </button>
      </form>

      <AgreementModal
        isOpen={modalState.isOpen}
        onClose={handleModalClose}
        title={
          modalState.type === 'terms'
            ? '서비스 이용약관'
            : '개인정보 수집 및 이용 동의'
        }
        content={getModalContent()}
      />

      {showSuccessModal && (
        <SuccessModal
          message={`회원가입이 완료되었습니다! (${countdown}초 후 자동으로 이동합니다)`}
          onClose={handleSuccessModalClose}
        />
      )}
    </div>
  );
};

export default Register;
