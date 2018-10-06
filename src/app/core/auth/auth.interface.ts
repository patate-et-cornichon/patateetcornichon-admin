export interface User {
  id: string;
  is_staff: boolean;
  email: string;
  first_name: string;
  last_name?: string;
  avatar?: string;
  website?: string;
}
