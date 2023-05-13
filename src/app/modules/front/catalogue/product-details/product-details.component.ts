import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Grocery } from 'src/app/shared/models/interface';
import { ApiService } from 'src/app/shared/services/Api service/api.service';
import { CartService } from 'src/app/shared/services/cartservice/cart.service';
import { EncryptionService } from 'src/app/shared/services/encryption/encryption.service';
import { ProductService } from 'src/app/shared/services/productservice/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  title: any;
  userId: any;
  constructor(
    private route: ActivatedRoute,
    private encryptionService: EncryptionService,
    private service: ProductService,
    private cartService: CartService,
    private toastr: ToastrService,
    private apiService: ApiService
  ) {}
  urlGroceryName: any;
  urlCategory: any;
  productId: number = 0;
  matchedProduct: any = [];
  productImg: any;
  price: any;
  discPrice: any;
  quantityCount: number = 1;

  ngOnInit() {
    this.route.params.subscribe((res) => {
      if(res){
        this.title = res['title'];
        this.productId = Number(res['id']);
        console.log(this.title, this.urlCategory, this.productId);
        this.encryptedProduct(this.productId);
      }
    });
    console.log(this.matchedProduct);
  }

  encryptedProduct(id: any) {
    this.encryptionService
      .Encryption(JSON.stringify(id))
      .subscribe((res: any) => {
        if(res){
          console.log(res.data);
          let encryptedId = res.data;
          this.getProductById(encryptedId);
        }
      });
    return this.matchedProduct;
  }


  minus() {
    if (this.quantityCount >= 1) {
      this.quantityCount -= 1;
      this.price = this.price - this.matchedProduct.amount;
      this.discPrice = this.discPrice - this.matchedProduct.discount_amount;
    }
  }


  plus() {
    if (this.quantityCount >= 0) {
      this.quantityCount += 1;
      this.price = this.price + this.matchedProduct.amount;
      this.discPrice = this.discPrice + this.matchedProduct.discpunt_amount;
    }
  }
  
  onAdd(product: any) {
    let cart = JSON.parse(localStorage.getItem('Cart'));
    let username = localStorage.getItem('user');
    console.log(cart,'cart')
    let matchedUser = cart.find((res:any)=>{
      return res.username === username
    })
    console.log(matchedUser,'matchedUser')
    this.cartService.getProducts(product, username);
  }

  getProductById(encryptedId: any) {
    this.apiService.getProductsById(encryptedId)?.subscribe({
      next: (res: any) => {
        if(res){
          console.log(res.data);
          this.matchedProduct = res.data;
          console.log(this.matchedProduct);
          this.price = this.matchedProduct.amount;
          this.discPrice = this.matchedProduct.discount_amount;
        }
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
