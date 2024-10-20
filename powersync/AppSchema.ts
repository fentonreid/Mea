import { column, Schema, Table } from "@powersync/react-native";

export const USERS_TABLE = "users";
export const UNITS_TABLE = "units";
export const SHOPPING_CATEGORIES_TABLE = "shopping_categories";
export const REVIEWS_TABLE = "reviews";
export const RECIPES_TABLE = "recipes";
export const RECIPE_INGREDIENTS_TABLE = "recipe_ingredients";
export const MEALS_TABLE = "meals";
export const MEAL_ROUTINES_TABLE = "meal_routines";
export const GENERAL_INGREDIENTS_TABLE = "general_ingredients";
export const DAILY_MEALS_TABLE = "daily_meals";

const users = new Table({
  created_at: column.text,
  username: column.text,
  user_id: column.text,
});

const units = new Table({
  id: column.integer,
  created_at: column.text,
  unit_name: column.text,
  unit_type: column.text,
  unit_display_name: column.text,
  base_unit: column.integer,
  is_base_unit: column.integer,
  conversion_possible: column.integer,
  measurement_system: column.text,
  conversion_factor_to_metric: column.real,
  conversion_factor_to_imperial: column.real,
  creator_id: column.text,
  is_public: column.integer,
});

const shopping_categories = new Table({
  id: column.integer,
  created_at: column.text,
  shopping_category: column.text,
  is_public: column.integer,
  creator_id: column.text,
});

const reviews = new Table({
  id: column.integer,
  created_at: column.text,
  creator_id: column.text,
  taste: column.real,
  effort: column.real,
  image_uri: column.text,
  additional_information: column.text,
  make_again: column.integer,
  recipe_id: column.integer,
  meal_routine_id: column.integer,
  meal_id: column.integer,
});

const recipes = new Table({
  id: column.integer,
  created_at: column.text,
  name: column.text,
  is_public: column.integer,
  categories: column.text,
  sub_categories: column.text,
  instructions: column.text,
  image_uri: column.text,
  creator_id: column.text,
});

const recipe_ingredients = new Table({
  id: column.integer,
  recipe_id: column.integer,
  ingredient_id: column.integer,
  quantity: column.integer,
  overwrite_default_measure_id: column.integer,
  display_measure: column.text,
});

const meals = new Table({
  id: column.integer,
  daily_meal_id: column.integer,
  meal_state: column.text,
  meal_type: column.text,
  recipe_id: column.integer,
  routine_id: column.integer,
});

const meal_routines = new Table({
  id: column.integer,
  created_at: column.text,
  meal_routine_state: column.text,
  start_date: column.text,
  end_date: column.text,
  creator_id: column.text,
});

const general_ingredients = new Table({
  id: column.integer,
  created_at: column.text,
  name: column.text,
  default_measure: column.integer,
  is_public: column.integer,
  shopping_categories: column.integer,
  creator_id: column.text,
});

const daily_meals = new Table({
  id: column.integer,
  routine_id: column.integer,
  date: column.text,
  day: column.text,
});

export const AppSchema = new Schema({
  users,
  units,
  shopping_categories,
  reviews,
  recipes,
  recipe_ingredients,
  meals,
  meal_routines,
  general_ingredients,
  daily_meals,
});

export type Database = (typeof AppSchema)["types"];

export type Users = Database["users"];
export type Units = Database["units"];
export type ShoppingCategories = Database["shopping_categories"];
export type Reviews = Database["reviews"];
export type Recipes = Database["recipes"];
export type RecipeIngredients = Database["recipe_ingredients"];
export type Meals = Database["meals"];
export type MealRoutines = Database["meal_routines"];
export type GeneralIngredients = Database["general_ingredients"];
export type DailyMeals = Database["daily_meals"];
