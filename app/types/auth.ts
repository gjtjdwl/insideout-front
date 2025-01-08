export type UserRole = 'user' | 'manager' | 'admin';

export interface RegisterRequestData {
  user_id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  password: string;
  department: string;
  departmentCode?: string;
}

export interface LoginRequestData {
  user_id: string;
  password: string;
}

export interface AuthResponseData {
  message: string;
  userId: string;
  accessToken: string;
  role: UserRole;
}

export interface User {
  userId: string;
  name: string;
  role: UserRole;
  department: string;
}
