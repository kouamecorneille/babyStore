import { ICategory } from "./Icategory";
import { Store } from "./Ishop";

export interface Shopcategorie{

  id:string;
  category:ICategory;
  shop:Store;
  is_active:boolean;
  added_at:string;
}
