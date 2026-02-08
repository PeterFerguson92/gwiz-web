// Frontend models for events + tickets

export interface Event {
  id: string;
  name: string;
  description?: string;
  location: string;
  start_datetime: string;
  end_datetime: string;
  ticket_price: string;
  capacity: number;
  remaining_tickets: number;
  is_sold_out: boolean;
  is_featured: boolean;
  cover_image?: string | null;
}

export interface EventTicket {
  id: string;
  event: Event;
  quantity: number;
  status: 'reserved' | 'confirmed' | 'cancelled';
  payment_status: 'included' | 'pending' | 'paid' | 'void';
  stripe_payment_intent_id?: string;
  stripe_client_secret?: string;
  truelayer_authorization_url?: string;
  cancel_token?: string | null;
  email_sent?: boolean;
  cancellation_email_sent?: boolean;
  created_at?: string;
}

export interface PurchaseTicketPayload {
  quantity: number;
  payment_provider?: 'stripe' | 'truelayer';
  return_url?: string;
  guest_name?: string;
  guest_email?: string;
  guest_phone?: string;
}

export type PurchaseTicketResponse = EventTicket;
