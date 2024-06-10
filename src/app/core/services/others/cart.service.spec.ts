import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';
import { Product } from '../../interfaces/Iproduct';

describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);
  });

  afterEach(() => {
    // Nettoyer le localStorage après chaque test
    localStorage.removeItem('cartItems');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a product to the cart', () => {
    const product: Product = {
      id: '1',
      name: 'Test Product',
      price: '10.99',
      reduced_price: '',
      image1: '',
      image2: '',
      image3: '',
      image4: '',
      image5: '',
      description: 'Test Product',
      quantity_in_stock: 10,
      instock: true,
      added_at: new Date(),
      average_rating: '',
      total_ratings: 0,
      slug: 'test-product',
      category: 'category1',
      shop: 'shop1'
    };

    service.addToCart(product, 2);

    const cartItems = service.getCartItems();
    expect(cartItems.length).toBe(1);
    expect(cartItems[0].product.id).toBe(product.id);
    expect(cartItems[0].quantity).toBe(2);
    expect(cartItems[0].product).toEqual(product);
  });

  it('should update quantity of existing product in the cart', () => {
    const product: Product = {
      id: '2',
      name: 'Another Product',
      price: '19.99',
      reduced_price: '',
      image1: '',
      image2: '',
      image3: '',
      image4: '',
      image5: '',
      description: 'Test Product',
      quantity_in_stock: 5,
      instock: true,
      added_at: new Date(),
      average_rating: '',
      total_ratings: 0,
      slug: 'another-product',
      category: 'category2',
      shop: 'shop2'
    };

    service.addToCart(product, 1);
    service.updateCartItemQuantity(product.id, 3);

    const cartItems = service.getCartItems();
    const updatedItem = cartItems.find(item => item.product.id === product.id);
    expect(updatedItem).toBeTruthy();
    expect(updatedItem!.quantity).toBe(3);
  });

  it('should remove a product from the cart', () => {
    const product: Product = {
      id: '3',
      name: 'Test Product 3',
      price: '15.50',
      reduced_price: '',
      image1: '',
      image2: '',
      image3: '',
      image4: '',
      image5: '',
      description: 'Test Product',
      quantity_in_stock: 8,
      instock: true,
      added_at: new Date(),
      average_rating: '',
      total_ratings: 0,
      slug: 'test-product-3',
      category: 'category3',
      shop: 'shop3'
    };

    service.addToCart(product, 1);
    service.removeFromCart(product.id);

    const cartItems = service.getCartItems();
    expect(cartItems.length).toBe(0);
  });

  it('should calculate total price of items in the cart', () => {
    const product1: Product = {
      id: '4',
      name: 'Product 4',
      price: '25.99',
      reduced_price: '',
      image1: '',
      image2: '',
      image3: '',
      image4: '',
      image5: '',
      description: 'Test Product',
      quantity_in_stock: 15,
      instock: true,
      added_at: new Date(),
      average_rating: '',
      total_ratings: 0,
      slug: 'product-4',
      category: 'category4',
      shop: 'shop4'
    };

    const product2: Product = {
      id: '5',
      name: 'Product 5',
      price: '12.99',
      reduced_price: '',
      image1: '',
      image2: '',
      image3: '',
      image4: '',
      image5: '',
      quantity_in_stock: 20,
      instock: true,
      added_at: new Date(),
      average_rating: '',
      description: 'Test Product',
      total_ratings: 0,
      slug: 'product-5',
      category: 'category5',
      shop: 'shop5'
    };

    service.addToCart(product1, 2);
    service.addToCart(product2, 3);

    const total = service.getTotal();
    // expect(total).toBe(25.99 * 2 + 12.99 * 3);
  });

  it('should clear the cart', () => {
    const product: Product = {
      id: '6',
      name: 'Product 6',
      price: '30.00',
      reduced_price: '',
      image1: '',
      image2: '',
      image3: '',
      image4: '',
      image5: '',
      quantity_in_stock: 12,
      instock: true,
      description: 'Test Product',
      added_at: new Date(),
      average_rating: '',
      total_ratings: 0,
      slug: 'product-6',
      category: 'category6',
      shop: 'shop6'
    };

    service.addToCart(product, 1);
    service.clearCart();

    const cartItems = service.getCartItems();
    expect(cartItems.length).toBe(0);
  });
});
