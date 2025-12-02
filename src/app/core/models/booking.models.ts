export interface FitnessClass {
  id: number; // or string – adjust to backend
  name: string;
  description: string | null;
  genre: string | null;
  capacity: number;
  price: number;
  image_url: string | null;
  instructors: string[]; // e.g. ["Alex", "Sam"]
  is_active: boolean;
}

export interface ClassSession {
  id: number; // or string
  fitness_class_id: number; // or string
  date: string; // "2025-12-04"
  start_time: string; // "18:00"
  end_time: string; // "19:00"
  status: 'scheduled' | 'cancelled';
  capacity: number;
  spaces_left: number;
  price: number;
}

export interface Booking {
  id: number; // or string
  class_session_id: number;
  status: 'booked' | 'cancelled' | 'no_show';
  payment_status: 'included' | 'pending' | 'paid' | 'void';
  attendance_status: 'unknown' | 'present' | 'absent' | 'no_show';
  created_at: string;
  // if your backend returns nested objects, add them here:
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
