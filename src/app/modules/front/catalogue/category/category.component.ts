import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/router';
import { Grocery } from 'src/app/shared/models/interface';
import { ProductService } from 'src/app/shared/services/productservice/product.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/shared/services/cartservice/cart.service';
import { partition } from 'rxjs';
import { Location } from '@angular/common';
import { ApiService } from 'src/app/shared/services/Api service/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  cartLength: any;
  constructor(
    private route: ActivatedRoute,
    private proService: ProductService,
    private cartService: CartService,
    private location: Location,
    private apiService: ApiService,
    private toastr: ToastrService
  ) { 
    
  }
  products: Grocery[] = this.proService.groceryList;
  urlCategory: string = '';
  uniqueItems: string[] = [];
  filteredProducts = this.proService.filteredProducts;
  filteredProductsBasedOnCategory =
    this.proService.filteredProductsBasedOnCategory;

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.urlCategory = params['i'];
      this.products = this.filteredProducts(
        this.proService.groceryList,
        this.urlCategory
      );
      // this.products = this.proService.getProductByCategories();
      this.uniqueItems = this.storesFilterData();
    });
    this.apiService.getAllCategories().subscribe((res:any)=>{
      console.log(res);
    })
    window.scrollTo(0, 0);
  }

  //  this function is for unique stores from filtered stores

  storesFilterData() {
    const stores: string[] = [];
    const products = this.getProducts();
    products.forEach((element: any) => {
      if (!stores.includes(element.store)) {
        stores.push(element.store);
      }
    });
    console.log(stores);
    return stores;
  }

  selectedStore: string[] = [];

  // this function is for checkbox

  storeArray(event: any) {
    const brandValue = event.target.value;

    // if users check the checkbox

    if (event.target.checked) {
      this.selectedStore.push(brandValue);
      console.log('selected store from filter', this.selectedStore);
    }

    // if user uncheck
    else {
      const index = this.selectedStore.indexOf(brandValue);
      if (index > -1) {
        this.selectedStore.splice(index, 1);
      }
    }

    //  if length of an array is 0 then this condition

    if (this.selectedStore.length === 0) {
      this.products = this.filteredProducts(
        this.proService.groceryList,
        this.urlCategory
      );
    }

    //  if not zero then this condition
    else {
      this.products = this.proService.groceryList.filter((product) => {
        return this.selectedStore.indexOf(product.store) !== -1;
      });
    }
  }

  getProducts() {
    let products = this.products;
    const { selectedCategory, searchTerm } = this.proService;
    if (selectedCategory) {
      products = products.filter(({ category }) => category === selectedCategory);
    }
    if (searchTerm) {
      products = products.filter(({ grocery_name }) =>
        grocery_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return products;
  }
  

  // this is for displaying filter box

  filterToggle: boolean = false;
  display() {
    this.filterToggle = !this.filterToggle;
  }

  // add products to cart
  cartArray: any;

  // add product to cart in product.json
  finalSubTotal: number = 0;
  totalPrice=0;
  cartProducts:Grocery[]=[];
  addProductToCart(product: Grocery) {
    this.cartService.addProductToCart(product);

  }
}
