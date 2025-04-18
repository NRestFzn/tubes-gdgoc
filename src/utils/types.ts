import { WhereFilterOp } from "firebase/firestore";

export interface User {
  id?: string;
  name: string;
  phone: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Booking {
  id?: string;
  name: string;
  phone: string;
  destination: {
    city: string;
    country: string;
  };
  createdAt?: Date;
  updatedAt?: Date;

  userId?: string;
  destinationId?: string;
}

export interface Destination {
  id?: string;
  city: string;
  country: string;
  price: number;
  quota: number;
  discount: number | 0;
  rating?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Vacation {
  id?: string;
  city: string;
  country: string;
  price: number;
  dayTrip: number;
  quota: number;
  rating?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface fireStoreWhere {
  field: string;
  operator: WhereFilterOp;
  value: any;
}
