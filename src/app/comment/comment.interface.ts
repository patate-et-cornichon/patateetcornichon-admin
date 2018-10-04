import { User } from '../core/auth/auth.interface';


export interface Comment {
  id: string;
  is_valid: boolean;
  unregistered_author?: {
    email: string;
    first_name: string;
    last_name?: string;
    website?: string;
  };
  registered_author?: User;
  be_notified: boolean;
  content: string;
  content_type: string;
  object_id: string;
  parent?: string;
}

export interface PaginatedComments {
  count: number;
  num_pages: number;
  page_size: number;
  current_page: number;
  previous_page: number;
  next: string;
  previous: string;
  results: Comment[];
}
