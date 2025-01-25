export interface MemberData {
  name: string;
  userId: string;
  email: string;
  phoneNumber: string;
  role: string;
}

export interface SessionIdResponse {
  sessionId: number;
}

export interface statsData {
  [date: string]: {
    average: number;
    variance: number;
  };
}

export interface ORSRequest {
  sessionId: number;
  orsScore: number;
  userId: string;
}
