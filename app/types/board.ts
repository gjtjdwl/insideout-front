export interface InquiryData {
  userId: string;
  inquiryId: number;
  title: string;
  content: string;
  createdTime: string | number;
  modifiedTime: string | number;
}

export interface IFormData {
  userId: string;
  title: string;
  content: string;
  file: File | null;
  message?: string;
}
