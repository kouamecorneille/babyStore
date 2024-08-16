import { Injectable, signal } from '@angular/core';
import { Product } from '../../interfaces/Iproduct';
import { BehaviorSubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { CartItem } from '../../interfaces/IcartItem';
import { UserInfo } from '../../pages/content/shop-checkout/shop-checkout.component';



interface WhishListItem {
  product: Product;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  defaultUser : UserInfo = {
    full_name:'',
    delivery_address:'',
    commune:''
  }

  public cartItems: BehaviorSubject<CartItem[]> = new BehaviorSubject<CartItem[]>([]);
  public whishListItems: BehaviorSubject<WhishListItem[]> = new BehaviorSubject<WhishListItem[]>([]);
  cartItemsSignal = signal<CartItem[]>([]);
  cartItemsSignalSummary = signal<CartItem[]>([]);
  totalItems = new BehaviorSubject<number>(0);
  totalItemsWhishList = new BehaviorSubject<number>(0);
  totalCart = new BehaviorSubject<number>(0);
  userInfo = signal<UserInfo>(this.defaultUser)



  constructor(private toastr: ToastrService,) {

    if (typeof localStorage !== 'undefined') {
      // Charger le panier depuis le localStorage lors de l'initialisation du service
      const storedCartItems = localStorage.getItem('cartItems');
      if (storedCartItems) {
          this.cartItems.next(JSON.parse(storedCartItems));
          this.cartItemsSignal.set(JSON.parse(storedCartItems))
          this.getTotalItems(); // Appel initial pour mettre à jour la valeur
          this.getTotal()
      } else {
        this.totalItems.next(0);
      }
    }

    if (typeof localStorage !== 'undefined') {
      // Charger le panier depuis le localStorage lors de l'initialisation du service
      const storedWhishListItems = localStorage.getItem('whishListItems');
      if (storedWhishListItems) {
        this.whishListItems.next(JSON.parse(storedWhishListItems));
        this.getTotalItemsWhishList(); // Appel initial pour mettre à jour la valeur
      } else {
        this.totalItemsWhishList.next(0);
      }
    }

  }


  ressetCart(){

    this.totalCart.next(0)
    this.totalItems.next(0)
    this.cartItemsSignal.set([])

    localStorage.removeItem('cartItems')

  }

  getTotalItems(): void {
    let totalItems = 0;

    this.cartItemsSignal().forEach(item => {
      totalItems += item.quantity;
    });

    this.totalItems.next(totalItems);
  }

  getTotalItemsWhishList(): void {
    const items = this.whishListItems.value || []; // Obtenez les articles actuels de la liste de souhaits
    let totalItems = items.length; // Calculez le nombre total d'articles

    this.totalItemsWhishList.next(totalItems); // Émettre la nouvelle valeur du nombre total d'articles
}



  addToCart(product: Product, quantity: number = 1): void {

    const productId = product.id;
    const existingItems = this.cartItemsSignal() || [] ;
    const existingItem = existingItems.find(item => item.product.id === productId);

    if (existingItem) {

      existingItem.quantity += quantity;
      // this.cartItems.next(existingItems); // Émettre la nouvelle valeur du panier
      this.cartItemsSignal.set(existingItems)
      this.toastr.success('Le produit a été ajouté avec succès !', 'Succès !', { timeOut: 3000 });
      this.saveCartToLocalStorage();
      this.getTotalItems();
      this.getTotal()

    } else {

      const newItem: CartItem = { quantity, product };
      const updatedItems = [...existingItems, newItem]; // Créer un nouveau tableau avec l'élément ajouté
      // this.cartItems.next(updatedItems); // Émettre la nouvelle valeur du panier
      this.cartItemsSignal.set(updatedItems)
      this.toastr.success('Le produit a été ajouté avec succès !', 'Succès !', { timeOut: 3000 });
      this.saveCartToLocalStorage();
      this.getTotalItems();
      this.getTotal()
    }


  }

  addToWhishList(product: Product): void {
    const productId = product.id;
    const existingItems = this.whishListItems.value || []; // Assurez-vous de gérer le cas où whishListItems est null ou undefined
    const existingItem = existingItems.find(item => item.product.id === productId);

    if (existingItem) {
      // L'article existe déjà dans la liste de souhaits
      this.toastr.warning('Le produit est déjà dans votre liste de souhaits.', 'Avertissement');
    } else {
      // L'article n'existe pas encore dans la liste de souhaits, ajoutez-le
      const newItem: WhishListItem = { product };
      const updatedItems = [...existingItems, newItem];
      this.whishListItems.next(updatedItems); // Émettre la nouvelle valeur de la liste de souhaits
      this.saveWhishListToLocalStorage();
      this.toastr.success('Le produit a été ajouté avec succès à la liste des souhaits !', 'Succès !', { timeOut: 3000 });
      this.getTotalItemsWhishList();
    }
}



  removeFromCart(productId: string): void {
    // Filtrer les éléments du panier pour exclure celui avec l'ID spécifié
    const updatedItems = this.cartItemsSignal().filter(item => item.product.id !== productId);

    // Mettre à jour le panier avec les éléments filtrés
    this.cartItemsSignal.set(updatedItems)

    // Sauvegarder les modifications dans le localStorage
    this.saveCartToLocalStorage();
    this.toastr.success('Le produit a été supprimé de votre pannier !', 'Succès !', { timeOut: 3000 });
    // Mettre à jour le nombre total d'articles et le total du panier
    this.getTotalItems();
    this.getTotal();
  }


  removeFromWhishList(productId: string): void {
    const updatedItems = this.whishListItems.value.filter(item => item.product.id !== productId);
    this.whishListItems.next(updatedItems); // Émettre la nouvelle valeur du panier
    this.saveWhishListToLocalStorage();
    this.getTotalItemsWhishList();
  }



  updateCartItemQuantity(productId: string, quantity: number): void {
    const updatedItems =  this.cartItemsSignal().map(item => {
      if (item.product.id === productId) {
        item.quantity = quantity;
      }
      return item;
    });

    this.cartItemsSignal.set(updatedItems); // Émettre la nouvelle valeur du panier
    this.saveCartToLocalStorage();
    this.getTotalItems();
    this.getTotal()
  }




  getCartItems() {
    return this.cartItemsSignal();
  }


  getTotal() {
    let total = 0;

    this.cartItemsSignal().forEach(item => {
      const itemPrice = parseFloat(item.product.reduced_price);
      if (!isNaN(itemPrice)) { // Check for valid number
        total += itemPrice * item.quantity;
      }else{
        total += parseFloat(item.product.price) * item.quantity;
      }
    });

    this.totalCart.next(total);
    localStorage.setItem('totalCart', JSON.stringify(this.totalCart));

    // return total;
  }



  clearCart(): void {
    this.cartItemsSignal.set([]);
    this.saveCartToLocalStorage();
    this.getTotalItems();
    this.getTotal()
  }

  private saveCartToLocalStorage(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('cartItems', JSON.stringify(this.cartItemsSignal()));
    }
  }

  private saveWhishListToLocalStorage(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('whishListItems', JSON.stringify(this.whishListItems.value));
    }
  }
}
