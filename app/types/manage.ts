export interface MemberData {
  name: string;
  userId: string;
  email: string;
  phoneNumber: string;
  role: string;
}

export interface SessionIdResponse {
  sessionId: number;
}

export interface statsData {
  weeklyStatistics: Record<string, statisticData>; //Record<string, StatisticData>: weeklyStatistics는 각 날짜(string 타입)를 key로 하고, 해당 값은 StatisticData 타입 객체
}
export interface statisticData {
  date: string;
  average: number;
  variance: number;
}
export interface diffData {
  latest:statisticData,
  varianceDiff:number;
  averageDiff:number;
}

export interface ORSRequest {
  sessionId: number;
  orsScore: number;
  userId: string;
}

export interface Person {
  id : string;
  name: string;
}
export interface DepartmentContextType {
  selectedPerson: Person | null;
  setSelectedPerson: (person: Person | null) => void;
}