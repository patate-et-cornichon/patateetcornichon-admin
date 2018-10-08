import { User } from '../core/auth/auth.interface';


export interface Tag {
  slug: string;
  name: string;
}

export interface Story {
  id: string;
  slug: string;
  created: string;
  updated: string;
  published: boolean;
  title: string;
  sub_title: string;
  full_title: string;
  main_picture: string;
  main_picture_thumbs: {
    mini: string;
    medium: string;
    large: string;
  };
  content: string;
  tags: Tag[];
  authors: User[];
  comments_count: number;
  meta_description: string;
}

export interface PaginatedStories {
  count: number;
  num_pages: number;
  page_size: number;
  current_page: number;
  previous_page: number;
  next: string;
  previous: string;
  results: Story[];
}
