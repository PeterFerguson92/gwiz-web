export interface MembershipPlan {
  id: string;
  name: string;
  description: string;
  price: string;
  plan_type: 'session_based' | string;
  included_class_sessions: number;
  included_events: number;
  is_active: boolean;
}

export interface Membership {
  id: string;
  plan: MembershipPlan;
  remaining_class_sessions: number;
  remaining_events: number;
  status: 'active' | 'cancelled' | 'expired';
  starts_at: string | null;
  expires_at: string | null;
  next_reset_at?: string | null;
}

export interface MembershipResponse {
  membership: Membership | null;
  stripe_client_secret: string | null;
  purchase_id: string | null;
}
