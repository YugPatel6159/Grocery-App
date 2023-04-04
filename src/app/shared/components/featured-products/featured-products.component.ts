import { Component } from '@angular/core';
import Swiper from 'swiper';
import { ProductService } from '../../services/productservice/product.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cartservice/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-featured-products',
  templateUrl: './featured-products.component.html',
  styleUrls: ['./featured-products.component.css']
})
export class FeaturedProductsComponent {
  constructor(private service:ProductService, private route:ActivatedRoute, private cartService:CartService,
    private toastr: ToastrService){
  }
  product = this.service.products;
  groceryList = this.service.groceryList;
 urlCategory:string='';
 onAdd(product:any){
 this.cartService.addProductToCart(product);

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
