import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ProductService } from 'src/app/shared/services/productservice/product.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/shared/services/cartservice/cart.service';
import { ApiService } from 'src/app/shared/services/Api service/api.service';
import { EncryptionService } from 'src/app/shared/services/encryption/encryption.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  cartLength: any;
  productByCategory: any;
  userId: any;
  cartToggle: boolean = false;
  crtArray: any[] = [];
  constructor(
    private route: ActivatedRoute,
    private proService: ProductService,
    private cartService: CartService,
    private apiService: ApiService,
    private encryptionService: EncryptionService,
    private router: Router
  ) {}
  product: any;
  urlCategory: string = '';
  uniqueItems: string[] = [];
  filteredProducts = this.proService.filteredProducts;
  filterToggle: boolean = false;

  ngOnInit() {
    this.proService.onFilterProducts.subscribe((filteredProducts: any[]) => {
      this.productByCategory = filteredProducts;
    });
    this.route.params.subscribe((params) => {
      this.urlCategory = params['i'];
      if (this.urlCategory == 'All' || this.urlCategory == '') {
        this.allCategory();
      } else {
        this.otherThanAllCategory(); // this.getProductByCategories(this.urlCategory);
      }
    });
    this.getAllCategories();
    window.scrollTo(0, 0);
  }

  getAllCategories() {
    this.apiService.getAllCategories()?.subscribe((res: any) => {
      if (res) {
        console.log(res.data,'categories from filter');
        this.uniqueItems = res.data;
        console.log(this.uniqueItems,'unique items');
      }
    });
  }


  allCategory() {
    this.apiService.getAllProducts()?.subscribe((res: any) => {
      if (res) {
        console.log('res.data', res.data);
        if (this.proService.searchTerm) {
          // this.productByCategory = this.proService.filterProducts(this.proService.searchTerm,);;
          console.log(this.productByCategory, 'from aqall');
        } else {
          this.productByCategory = res.data;
          console.log('else');
        }
      }
    });
  }

  otherThanAllCategory() {
    let categories;
    this.apiService.getAllCategories()?.subscribe((res: any) => {
      if (res) {
        categories = res.data;
        console.log('res-data', res.data);
        let categoryId: any;
        categories.find((category: any) => {
          if (category.slug == this.urlCategory) {
            categoryId = category.id;
            console.log(categoryId);
            this.encryptionService
              .Encryption(JSON.stringify(categoryId))
              .subscribe((res) => {
                if (res) {
                  categoryId = res.data;
                }
                if (!this.proService.searchTerm) {
                  this.apiService
                    .getProductsByCategories(categoryId)
                    .subscribe((product: any) => {
                      if (product) {
                        this.productByCategory = product.data.map(
                          (product: any) => {
                            return product.product;
                          }
                        );
                      }
                    });
                } else {
                  this.productByCategory =
                    this.proService.filteredProductsBasedOnCategory;
                }
                console.log('this.product', this.productByCategory);
              });
          }
        });
      }
    });
  }

  getProductByCategories(id: any) {
    this.encryptionService.Encryption(id).subscribe((res: any) => {
      if (res) {
        this.apiService
          .getProductsByCategories(res.data)
          .subscribe((res: any) => {
            if (res) {
              console.log('category wise', res.data);
              this.productByCategory = res.data;
            }
          });
      }
    });
  }

  routeToProductDetails(id: any, title: any) {
    this.router.navigate(['/product-details', id, title]);
  }

  // this is for displaying filter box

  display() {
    this.filterToggle = !this.filterToggle;
  }

  getUserDetails(product: any) {
    this.apiService.getUserDetails()?.subscribe({
      next: (data: any) => {
        if (data) {
          console.log(data);
          this.userId = data.data.id;
          console.log(this.userId, 'userid from category');
          this.cartService.addProductToCart(product, this.userId);
        }
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
  showImage(img: any) {
    return 'http://localhost:8080/api/v1/get-image/' + img;
  }

  addProductToCart(product: any) {
    let cart = JSON.parse(localStorage.getItem('Cart'));
    let username = localStorage.getItem('user');
    console.log(cart, 'cart');
    let matchedUser = cart.find((res: any) => {
      return res.username === username;
    });
    console.log(matchedUser, 'matchedUser');
    this.cartService.getProducts(product, username);
  }
}
