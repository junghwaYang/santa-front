// API Response Types

// Auth
export interface User {
  userId: string;
  name: string;
  email?: string;
  profileImage?: string | null;
  provider?: "kakao" | "google";
  uniqueLink: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user: User;
}

export interface RefreshResponse {
  accessToken: string;
  expiresIn: number;
}

// User
export interface UserInfo {
  userId: string;
  name: string;
  uniqueLink: string;
  createdAt: string;
  responseCount: number;
  canViewResult: boolean;
  minimumResponses: number;
  resultGenerated: boolean;
  resultCharacter?: Character;
  resultModifier?: Modifier;
  isNicknameSet?: boolean;
}

export interface UserByLink {
  userId: string;
  name: string;
  responseCount: number;
}

// Questions
export type QuestionAnswer = "A" | "B" | "C" | "D";

export interface QuestionChoice {
  id: QuestionAnswer;
  text: string;
}

export interface Question {
  id: string;
  text: string;
  choices: QuestionChoice[];
}

export interface QuestionsResponse {
  questions: Question[];
}

// Responses
export interface CheckResponseResult {
  canRespond: boolean;
  userId: string;
  userName: string;
}

export interface SubmitResponseRequest {
  userId: string;
  respondentNickname: string;
  answers: Record<string, QuestionAnswer>;
  warmMessage?: string;
}

export interface SubmitResponseResult {
  responseId: string;
  message: string;
  currentResponseCount: number;
  minimumResponses: number;
  canViewResult: boolean;
}

export interface ResponseItem {
  responseId: string;
  respondentNickname: string;
  createdAt: string;
  warmMessage?: string;
}

export interface ResponsesListResult {
  userId: string;
  userName: string;
  responseCount: number;
  responses: ResponseItem[];
  canViewResult: boolean;
  minimumResponses: number;
}

// Results
export type Character = "SANTA" | "RUDOLPH" | "DWARF";
export type Modifier = "SELFCARE" | "SOCIAL" | "HOMEBODY" | "EMOTIONAL" | "PLANNER";
export type ShareChannel = "kakao" | "insta" | "twitter" | "facebook" | "link" | "etc";

export interface ResultDetail {
  character: Character;
  modifier: Modifier;
  resultKey: string;
  title: string;
  description: string;
  imageUrl?: string | null;
}

export interface QuestionStatChoice {
  choice: QuestionAnswer;
  text: string;
  count: number;
  percentage: number;
}

export interface QuestionStat {
  question: string;
  total: number;
  results: QuestionStatChoice[];
  first: QuestionStatChoice;
  second: QuestionStatChoice;
}

export interface WarmMessage {
  nickname: string;
  message: string;
  createdAt: string;
}

export interface ResultResponse {
  userId: string;
  userName: string;
  responseCount: number;
  result: ResultDetail;
  scores: {
    character: Record<Character, number>;
    modifier: Record<Modifier, number>;
  };
  questionStats: Record<string, QuestionStat>;
  warmMessages: WarmMessage[];
  generatedAt: string;
}

// Error
export interface ApiError {
  success: false;
  error: string;
  message: string;
  data?: Record<string, unknown>;
}
