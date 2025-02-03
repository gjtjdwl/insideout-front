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

  useEffect(() => {
    // 클라이언트에서만 localStorage 접근
    if (typeof window !== 'undefined') {
      const savedPerson = localStorage.getItem('selectedPerson');
      const initialPerson = savedPerson ? JSON.parse(savedPerson) : null;
      setSelectedPerson(initialPerson);
    }
    if (selectedPerson) {
      localStorage.setItem('selectedPerson', JSON.stringify(selectedPerson));
    } else {
      localStorage.removeItem('selectedPerson');
    }
  }, []);

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
