export interface Category {
  id: number;
  slug: string;
  name: string;
  children?: Category[];
}

export interface Tag {
  slug: string;
  name: string;
}

export interface Unit {
  name: string;
}

export interface Ingredient {
  name: string;
  slug: string;
}

export interface RecipeIngredient {
  ingredient: string;
  quantity?: number;
  unit?: string;
}

export interface RecipeComposition {
  name?: string;
  ingredients: RecipeIngredient[];
}

export interface Recipe {
  id: string;
  slug: string;
  created: number;
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
  secondary_picture?: string;
  secondary_picture_thumbs?: {
    medium: string;
    large: string;
  };
  goal: string;
  preparation_time: number;
  cooking_time?: number;
  fridge_time?: number;
  leavening_time?: number;
  difficulty: number;
  introduction: string;
  steps: string[];
  composition: RecipeComposition[];
  categories: Category[];
  tags: Tag[];
  comments_count: number;
  meta_description: string;
}

export interface PaginatedRecipes {
  count: number;
  num_pages: number;
  page_size: number;
  current_page: number;
  previous_page: number;
  next: string;
  previous: string;
  results: Recipe[];
}
