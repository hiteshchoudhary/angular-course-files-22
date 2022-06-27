import { CartService } from './../../service/cart.service';
import { Product } from './../../model/Product';
import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css'],
})
export class CartItemComponent implements OnInit {
  @Input() product: Product;

  constructor(
    private cartService: CartService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  // will add the product in the cart
  handleBuyNow(product: Product) {
    const res = this.cartService.addInCart(product);
    if (res) {
      this.toastr.success('Added to the cart');
    } else {
      this.toastr.error('Already Present in the cart');
    }
  }
}
