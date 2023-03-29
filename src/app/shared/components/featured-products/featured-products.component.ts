import { Component } from '@angular/core';
import Swiper from 'swiper';
import { ProductService } from '../../services/productservice/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-featured-products',
  templateUrl: './featured-products.component.html',
  styleUrls: ['./featured-products.component.css']
})
export class FeaturedProductsComponent {
  constructor(private service:ProductService, private route:ActivatedRoute){
  }
  product = this.service.products;
  groceryList = this.service.groceryList;
 urlCategory:string='';
 onAdd(){
  window.scrollTo(0,0)
 }
  ngOnInit(){
    this.route.params.subscribe(params=>{
      this.urlCategory=params['i']});
      window.scrollTo(0,0)
  }
  ngAfterViewInit(){
    const swiper = new Swiper(".swiper-container", {
      slidesPerView: 5,
      spaceBetween: 5,
      // loop: true,
      // centeredSlides: true,
      grabCursor: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
      }
    });
  }
}
