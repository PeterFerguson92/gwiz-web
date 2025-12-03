// src/app/core/models/booking.models.ts

export interface FitnessClass {
  id: string;
  name: string;
  description: string | null;
  genre: string | null;
  capacity: number;
  price: number;
  image_url: string | null;
  instructors: Instructor[];
  is_active: boolean;
  // when using /with-sessions/ endpoint:
  upcoming_sessions?: ClassSession[];
}

export interface Instructor {
  id: string;
  name: string;
  role: string;
  instagram_link: string;
  profile_image: string | null;
}

export interface ClassSession {
  id: string;
  fitness_class_id: string;
  date: string; // 'YYYY-MM-DD'
  start_time: string; // 'HH:MM:SS'
  end_time: string; // 'HH:MM:SS'
  status: 'scheduled' | 'cancelled';
  capacity: number;
  spaces_left: number;
  price: number;
}

export interface Booking {
  id: string;
  class_session_id: string;
  status: 'booked' | 'cancelled' | 'no_show';
  payment_status: 'included' | 'pending' | 'paid' | 'void';
  attendance_status: 'unknown' | 'present' | 'absent' | 'no_show';
  created_at: string;
  class_session?: ClassSession;
  fitness_class?: FitnessClass;
}

// Convenience types for the UI
export interface FitnessClassWithNextSession extends FitnessClass {
  next_session: ClassSession | null;
}

export interface BookingWithDetails extends Booking {
  class_session?: ClassSession;
  fitness_class?: FitnessClass;
}

export interface BookSessionResponse {
  booking: Booking;
  message?: string;
}
