export interface mypageType {
  userId: string;
  name: string;
  email: string;
  phoneNumber: string;
  role: string;
  deptCode?: string;
  password?: string;
}

export interface mypageEditType {
  newPassword: string;
  email?: string;
  phoneNumber?: string;
  deptCode?: string;
}
