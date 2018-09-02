export interface User {
  id: string;
  is_staff: boolean;
  email: string;
  avatar: string;
  first_name: string;
  last_name?: string;
  website?: string;
}
