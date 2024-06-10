import { ICategory } from "./Icategory";
import { Store } from "./Ishop";

export interface Product {
  id: string;
  category: ICategory;
  shop: Store;
  name: string;
  description: string;
  price: string;
  reduced_price: string;
  image1: string;
  image2: string;
  image3: string;
  image4: string;
  image5: string;
  quantity_in_stock: number;
  instock: boolean;
  added_at: string;
  average_rating: string;
  total_ratings: number;
  slug: string;
}
