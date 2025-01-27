export interface SessionCreationRequest {
  userId: string;
}

export interface SessionCreationResponse {
  sessionId: number;
  userId: string;
  createdAt: string;
}

export interface SessionInfo {
  id: number;
  date: string;
  status: 'ACTIVE' | 'TERMINATED';
  orsScore?: number;
  srsScore?: number;
}

export interface MessageRequest {
  sessionId: number;
  userId: string;
  content: string;
  createdAt: string;
}

export interface MessageResponse {
  id: number;
  sessionId: number;
  authorType: 'USER' | 'AI';
  content: string;
  createdAt: string;
}

export interface ORSRequest {
  sessionId: number;
  orsScore: number;
}

export type AgreementType = 'ACCEPTED' | 'DENIED';

export interface SessionEndRequest {
  sessionId: number;
  srsScore: number;
  agreement: AgreementType;
}
