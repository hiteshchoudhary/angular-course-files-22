import { ToastrService } from 'ngx-toastr';
import { Product } from './../../model/Product';
import { CartService } from './../../service/cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  // total amount of the products in the cart
  amount: number = 0;

  // items in the cart of the product
  cartItems: Product[] = [];

  constructor(
    private cartService: CartService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {

    // getting the total items from the cart and setting
    this.cartService.getCartItem().subscribe((cartItems: Product[]) => {
      this.cartItems = cartItems;
    });

    // the total amount of all the products in the cart Only.
    // will get update value as subscribed
    this.cartService.getTotalAmount().subscribe((amount) => {
      this.amount = amount;
    });
  }

  // to remove the product from the cart
  // res contain boolean of item in the cart
  handleRemove(product: Product) {
    const res = this.cartService.removeFromCart(product);
    if (res) {
      this.toastr.success('Removed');
    } else {
      this.toastr.error('Unable to remove');
    }
  }

  // will empty the cart and reset the amount to 0
  // res contain boolean
  handleBuy() {
    const res = this.cartService.buyAll();
    if (res) {
      this.toastr.success('Purchase Complete');
    }
  }
}
