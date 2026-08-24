import type { Session } from '@supabase/supabase-js';

export interface IAuthService {
  signUp(email: string, password: string): Promise<AuthResult>;
  signIn(email: string, password: string): Promise<AuthResult>;
  signOut(): Promise<void>;
  verifyOtp(email: string, token: string, type: 'signup' | 'recovery'): Promise<AuthResult>;
  resendOtp(email: string, context: 'signup' | 'login_unverified'): Promise<void>;
  resetPassword(email: string): Promise<void>;
  updatePassword(newPassword: string): Promise<AuthResult>;
  getSession(): Promise<Session | null>;
  refreshSession(): Promise<Session | null>;
}

export type AuthResult =
  | { success: true; session: Session }
  | { success: false; error: AuthError };

export type AuthError = {
  code: 'invalid_credentials' | 'email_not_confirmed' | 'user_already_exists'
      | 'weak_password' | 'invalid_otp' | 'otp_expired' | 'rate_limited'
      | 'network_error' | 'unknown_error';
  message: string;
};