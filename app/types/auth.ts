export interface RegisterRequestData {
  user_id: string;
  name: string;
  email: string;
  phone: string;
  role: '부서장' | '부서원';
  password: string;
  department: string;
  departmentCode?: string;
}

export interface RegisterResponseData {
  message: string;
  userId: string;
}
