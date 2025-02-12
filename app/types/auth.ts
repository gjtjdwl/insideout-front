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

export interface RegisterFormData {
  name: string;
  email: string;
  phoneNumber: string;
  role: UserRole | '';
  userId: string;
  passwordHash: string;
  confirmPassword: string;
  department: string;
  deptCode: string;
}

export interface RegisterFormErrors {
  userId: string;
  passwordHash: string;
  email: string;
}
