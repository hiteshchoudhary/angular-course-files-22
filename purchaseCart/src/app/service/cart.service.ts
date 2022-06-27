import { Product } from './../model/Product';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// using faker package to get fake data
import { commerce, random } from 'faker';

// to use map with Obserable
import 'rxjs/add/operator/map';

import { Observable, of, BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class CartService {
  // cart property and setting initial value ([]) in the constructor
  cart: BehaviorSubject<Product[]>;

  // amount property and setting initial value (0) in the constructor
  amount: BehaviorSubject<number>;

  // api key of pexel.com
  private apiKey = '563492ad6f91700001000001ae97147d028f472c9edbf583ab605b29';

  // url of pexel api
  private url =
    'https://api.pexels.com/v1/search?query=laptop&per_page=6&page=1';

  constructor(private http: HttpClient) {
    // initailizing and setting the default value
    this.cart = new BehaviorSubject<Product[]>([]);
    this.amount = new BehaviorSubject<number>(0);
  }

  // getting six photos from pexel.com and going through each object of array and returning the new object with custom key-value pair
  // and then sending the array of product response to the buyPage component which is subscribed to this
  getProducts(): Observable<Product[]> {
    return this.http
      .get(this.url, {
        headers: {
          Authorization: this.apiKey,
        },
      })
      .map((data: any) => {
        // response object
        console.log(data);

        // destructuring the photos
        const { photos } = data;
        console.log(photos);

        // making new of all product with new property
        const allProduct = photos.map((photo) => ({
          smallImage: photo.src.medium,
          tinyImage: photo.src.tiny,
          productName: commerce.productName(),
          productPrice: random.number(500),
          id: random.uuid(),
        }));
        console.log('all product', allProduct);
        return allProduct;
      });
  }

  // to get the cart item  as Observable , so component can subscribe
  getCartItem() {
    return this.cart.asObservable();
  }

  // to get the total amount  as Observable , so component can subscribe
  getTotalAmount() {
    return this.amount.asObservable();
  }

  // add product in cart
  addInCart(product: Product) {
    // will check the product is already added or not
    const isAlreadyAdded = this.cart.value.findIndex(
      (array) => array.id === product.id
    );
    // if already added then returning false
    if (isAlreadyAdded !== -1) {
      return false;
    }

    // otherwise adding product
    // getting old value of the cart array and concating the new product and setting.
    this.cart.next(this.cart.getValue().concat(product));

    // updating the amount also
    // getting old amount and adding it with new product price
    this.amount.next(this.amount.getValue() + product.productPrice);

    // returning true if all goes correctly
    return true;
  }

  // will remove the product from  the cart and then return the boolean
  removeFromCart(product: Product) {

    // checking the index of the product
    const indexofProduct = this.cart.value.findIndex(
      (currentObj) => currentObj.id === product.id
    );


    // removing the product from the cart
    this.cart.getValue().splice(indexofProduct, 1);

    // updating the total amount in the cart
    this.amount.next(this.amount.getValue() - product.productPrice);

    // returning true if all goes correctly
    return true;
  }

  // will empty the cart and reset all values and return true
  buyAll() {
    this.amount.next(0);
    this.cart.next([]);
    return true;
  }
}
