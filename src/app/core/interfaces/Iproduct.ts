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


export const productDefault :Product = {
  id: '',
  category: {
    id: '',
    name: '',
    slug: '',
    description: '',
    image: '',
    is_active: false
  },
  shop: {
    id: '',
    name: '',
    phone_number_1: '',
    phone_number_2: '',
    description: '',
    logo: '',
    slug: '',
    email: '',
    location: '',
    facebook_link: '',
    whatsapp_link: '',
    instagram_link: '',
    twitter_link: '',
    is_active: false,
    can_evaluate: false,
    date_added: '',
    subscription: ''
  },
  name: '',
  description: '',
  price: '',
  reduced_price: '',
  image1: '',
  image2: '',
  image3: '',
  image4: '',
  image5: '',
  quantity_in_stock: 0,
  instock: false,
  added_at: '',
  average_rating: '',
  total_ratings: 0,
  slug: ''
}
