export interface User {
  id?: string;
  name: string;
  phone: string;
  email: string;
  password: string;
}

export interface Booking {
  id?: string;
  name: string;
  phone: string;
  destination: string;
}

export interface Destination {
  id?: string;
  city: string;
  country: string;
  price: number;
  quota: number;
  discount?: number;
  rating?: number;
}

export interface Vacation {
  id?: string;
  city: string;
  country: string;
  price: number;
  dayTrip: number;
  quota: number;
  rating?: number;
}
