import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swiper from 'swiper';
import { ProductService } from '../../services/productservice/product.service';
import { ApiService } from '../../services/Api service/api.service';

@Component({
  selector: 'app-explore-categories',
  templateUrl: './explore-categories.component.html',
  styleUrls: ['./explore-categories.component.css'],
})
export class ExploreCategoriesComponent {
  constructor(private service: ProductService, private route: ActivatedRoute, private router:Router,private apiService:ApiService) {
    // this.totalCategories = this.service.categories;
    this.apiService.getAllCategories().subscribe((data:any)=>{
      this.totalCategories = data.data
      console.log('categories',this.totalCategories);
    })
  }
  exploreCategories = this.service.exploreCategories;
  totalCategories:any;
  categoryName: any;
  groceryList = this.service.groceryList;
  countByCategory = this.groceryList.reduce((accumulator: any, currentItem) => {
    this.categoryName = currentItem.category;
    accumulator[this.categoryName] = (accumulator[this.categoryName] || 0) + 1;
    return accumulator;
  }, {});

  urlCategory: string = '';
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.urlCategory = params['i'];
    });
  
    console.log(this.countByCategory)
  }
  allProductsbasedOnCategory(category:any){
    this.service.searchTerm='';
    this.route.params.subscribe(params => {
      // console.log
      this.router.navigate(['catalogue/categories', category]);
    });
  }

  ngAfterViewInit() {
    const swiper = new Swiper('.swiper-container', {
      slidesPerView: 5,
      spaceBetween: 5,
      // loop: true,
      // centeredSlides: true,
      grabCursor: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
      },
    });
  }
}

