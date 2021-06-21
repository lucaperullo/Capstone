export interface Contact {
  phone: string;
  id: string;
  username: string;
  profileImage: string
}

export interface Store {
  contacts: Contact[];
  newContact: Contact;
}
