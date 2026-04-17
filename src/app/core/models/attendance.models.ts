export interface AttendanceActionPayload {
  source?: string;
  notes?: string;
}

export interface AttendanceCheckInByTokenPayload extends AttendanceActionPayload {
  token: string;
}

export interface AttendanceActionResponse {
  id: string;
  checked_in_at: string | null;
}

export interface AttendanceCheckInByTokenResponse extends AttendanceActionResponse {
  kind: 'ticket' | 'booking';
}

export interface AttendanceAttendeeItem {
  id: string;
  user_email: string;
  status: string;
  payment_status: string;
  checked_in_at: string | null;
}

export interface AttendancePaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface AttendanceListQuery {
  page?: number;
  page_size?: number;
}

export interface AttendanceSearchQuery extends AttendanceListQuery {
  q: string;
}
