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

export interface Recipe {
  id: string;
  slug: string;
  created: string;
  updated: string;
  published: boolean;
  title: string;
  sub_title: string;
  full_title: string;
  main_picture: string;
  secondary_picture?: string;
  goal: string;
  preparation_time: number;
  cooking_time?: number;
  fridge_time?: number;
  leavening_time?: number;
  difficulty: number;
  introduction: string;
  steps: string[];
  ingredients: RecipeIngredient[];
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
