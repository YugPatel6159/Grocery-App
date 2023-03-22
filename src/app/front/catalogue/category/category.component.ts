import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/router';
import { Grocery } from 'src/app/shared/interface';
import { ProductService } from 'src/app/shared/product.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/shared/cart.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private proService: ProductService,
    private cartService:CartService
  ) {}
  products:Grocery[] = this.proService.groceryList;
  urlCategory: string = '';
  uniqueItems:string[]=[];
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
      this.uniqueItems = this.storesFilterData();
    });
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

  storeArray(event:any) {
    const brandValue = event.target.value;

    // if users check the checkbox

    if (event.target.checked) {
      this.selectedStore.push(brandValue);
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

    if (
      this.proService.selectedCategory &&
      this.proService.selectedCategory != ''
    ) {
      products = products.filter(
        (p) => p.category == this.proService.selectedCategory
      );
    }
    if (this.proService.searchTerm && this.proService.searchTerm != '') {
      products = products.filter((p) =>
        p.grocery_name
          .toLowerCase()
          .includes(this.proService.searchTerm.toLowerCase())
      );
    }
    const path = window.location.pathname;
    const match = path.match('^/categories/All$');
    if (match) {
      products = this.proService.groceryList;
    }
    return products;
  }

  // this is for displaying filter box

  filterToggle:boolean = false;
  display() {
    this.filterToggle = !this.filterToggle;
  }

  // add products to cart
  cartArray:any;


  // add product to cart in product.json

  addProductToCart(product: Grocery) {
    
    // this.cartService.addProductToCart(product).subscribe(res=>{
    //   console.log(res);
    //   // this.cartArray.push(res);
    // })
    // let cartProduct = this.proService.matchProduct(product.id);
    this.cartArray=this.cartService.getProducts(product);
    console.log(this.cartArray)
    // this.cartService.myBehaviorSubject.next(this.cartArray);
    this.cartService.cartItem.next(this.cartArray);
  }
  
}
