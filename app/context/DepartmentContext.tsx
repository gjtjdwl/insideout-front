'use client'
import { createContext, useContext, useState } from "react";
interface Person {
  userId : string;
  name: string;
}
interface DepartmentContextType {
  selectedPerson: Person | null;
  setSelectedPerson: (person: Person | null) => void;
}
const DepartmentContext = createContext<DepartmentContextType | null>(null);
export default function DepartmentProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedPerson, setSelectedPerson] = useState<Person | null>( null);

  return (
    <DepartmentContext.Provider value={{selectedPerson, setSelectedPerson}}>
      {children}
    </DepartmentContext.Provider>
  )
}

export const useDepartment = () => useContext(DepartmentContext);