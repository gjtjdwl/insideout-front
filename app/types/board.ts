export interface InquiryData {
  userId: string | undefined;
  inquiryId: number;
  title: string;
  content: string;
  createdTime?: string | number;
  modifiedTime?: string | number;
  message?: string;
}

export interface IFormData {
  userId: string;
  title: string;
  content: string;
  file: File | null;
  message?: string;
}

export interface apiData {
  inquiryId: number;
  userId?: string;
}
