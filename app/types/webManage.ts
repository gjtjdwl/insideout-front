export interface departmentData {
  deptCode: string;
  departmentName: string;
  managerName: string;
}
export interface PagedepartmentData {
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  size: number;
  content: departmentData[];
}
export interface departmentUserData {
  userId: string;
  name: string;
  email: string;
  phoneNumber: string;
  role: string;
}
export interface PagedepartmentUserData {
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  size: number;
  content: departmentUserData[];
}

export interface weeklyData {
  weeklyStatistics: SRSData;
}

export interface SRSData {
  [key: string]: {
    average: number;
    variance: number;
  };
}
