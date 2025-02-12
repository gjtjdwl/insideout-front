'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { DepartmentContextType, Person } from '../types/manage';

const DepartmentContext = createContext<DepartmentContextType | undefined>(
  undefined
);
export default function DepartmentProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  // 로컬 스토리지에서 selectedPerson을 가져오는 useEffect
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedPerson = localStorage.getItem('selectedPerson');
      const initialPerson = savedPerson ? JSON.parse(savedPerson) : null;
      setSelectedPerson(initialPerson);
    }
  }, []); // 컴포넌트가 처음 렌더링될 때 한 번만 실행

  useEffect(() => {
    if (selectedPerson) {
      localStorage.setItem('selectedPerson', JSON.stringify(selectedPerson));
    } else {
      localStorage.removeItem('selectedPerson');
    }
  }, [selectedPerson]);

  return (
    <DepartmentContext.Provider value={{ selectedPerson, setSelectedPerson }}>
      {children}
    </DepartmentContext.Provider>
  );
}

// Context 사용 훅
export const useDepartment = (): DepartmentContextType => {
  const context = useContext(DepartmentContext);

  // context가 undefined일 경우 에러 발생
  if (!context) {
    throw new Error(
      'useDepartment는 DepartmentProvider 내부에서 사용해야 합니다.'
    );
  }

  return context;
};
