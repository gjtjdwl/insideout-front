export interface departmentData {
  deptCode: string;
  departmentName: string;
  managerName: string;
}

export interface departmentUserData {
  userId: string;
  name: string;
  email: string;
  phoneNumber: string;
  role: string;
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
