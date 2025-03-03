export interface Hotel {
  id: number;
  name?: string;
  location?: Location;
  stars?: number;
  checkIn?: Period;
  checkOut?: Period;
  contact: Contact;
  gallery?: string[];
  userRating?: number;
  price?: number;
  currency?: string;
}

interface Period {
  from?: string;
  to?: string;
}

interface Contact {
  phoneNumber?: string;
  email?: string;
}

interface Location {
  address?: string;
  city?: string;
  latitude?: number;
  longitude?: number;
}
