import { Component } from '@angular/core';

@Component({
  selector: 'app-trending-items',
  templateUrl: './trending-items.component.html',
  styleUrls: ['./trending-items.component.css']
})
export class TrendingItemsComponent {
  products = [
    {
      img:"../assets/peach.png",
      category:"peach",
      numberOfItems:"20"
    },
    {
      img:"../assets/peach.png",
      category:"peach",
      numberOfItems:"20"
    },
    {
      img:"../assets/peach.png",
      category:"peach",
      numberOfItems:"20"
    }
  ]
}
