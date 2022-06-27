import { Product } from './../../model/Product';
import { CartService } from './../../service/cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buy-section',
  templateUrl: './buy-section.component.html',
  styleUrls: ['./buy-section.component.css'],
})
export class BuySectionComponent implements OnInit {
  constructor(private cart: CartService) {}
  products: Product[];

  ngOnInit(): void {
    // getting the list of the product from the service
    this.cart.getProducts().subscribe((products) => {
      this.products = products;
    });
  }
}
