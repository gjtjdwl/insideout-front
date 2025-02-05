export interface mypageData {
  userId: string;
  name: string;
  email: string;
  phoneNumber: string;
  role: string;
  deptCode?: string;
}

export interface editRequestData {
  newPassword: string;
  email: string;
  phoneNumber: string;
  deptCode: string;
}

export interface editFormData {
  newPassword: string;
  email: string;
  phoneNumber: string;
  deptCode: string;
  confirmPassword: string;
}

export interface counsellog {
  orsScore: number;
  summary: string;
  status: string | null;
  feedback: string;
  createdAt: string;
}
