export interface InquiryData {
  userId: string | undefined;
  inquiryId: number;
  title: string;
  content: string;
  createdTime: string | number;
  modifiedTime?: string | null;
  message: string;
  filePath: string[] | null;
  comments: CommentData[];
}

export interface IFormData {
  userId: string | undefined;
  inquiryId?: number;
  title: string;
  content: string;
  file?: File | null;
  message?: string;
}

export interface apiData {
  inquiryId: number;
  userId?: string;
}

export interface delData {
  commentId: number;
  userId: string;
}

export interface CommentData {
  userId: string;
  role: string;
  inquiryId: number;
  commentId: number;
  content: string;
  createdTime?: string | number;
  modifiedTime?: string | null;
  message: string;
}
