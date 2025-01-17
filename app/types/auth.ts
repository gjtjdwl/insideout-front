export type UserRole = 'USER' | 'MANAGER' | 'ADMIN';

export interface RegisterRequestData {
  userId: string;
  passwordHash: string;
  name: string;
  email: string;
  phoneNumber: string;
  department: string;
  role: UserRole;
  deptCode?: string;
}

export interface LoginRequestData {
  userId: string;
  password: string;
}

export interface AuthResponseData {
  message: string;
  userId: string;
  name: string;
  jwt: string;
  role: UserRole;
}

export interface User {
  userId: string;
  name: string;
  role: UserRole;
  department?: string;
}

export interface InquiryData {
  userId : string
  inquiryId: number;
  title : string;
  content: string;
  createdTime: string | number;
  modifiedTime: string | number;
}