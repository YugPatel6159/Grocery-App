import { Injectable } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { Grocery } from './interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private route:ActivatedRoute) { }
 
  products = [
    {
      img:"../assets/image 3.png",
      category:"vegetable",
      productName:"Redish 500g",
      store:"Mr Food",
      price:3.99,
      discountedPrice:2
    },{
      img:"../assets/image 3.png",
      category:"vegetable",
      productName:"Redish 500g",
      store:"Mr Food",
      price:3.99,
      discountedPrice:2
    },{
      img:"../assets/image 3.png",
      category:"vegetable",
      productName:"Redish 500g",
      store:"Mr Food",
      price:3.99,
      discountedPrice:2
    },{
      img:"../assets/image 3.png",
      category:"vegetable",
      productName:"Redish 500g",
      store:"Mr Food",
      price:3.99,
      discountedPrice:2
    },
    {
      img:"../assets/image 3.png",
      category:"vegetable",
      productName:"Redish 500g",
      store:"Mr Food",
      price:3.99,
      discountedPrice:2
    },{
      img:"../assets/image 3.png",
      category:"vegetable",
      productName:"Redish 500g",
      store:"Mr Food",
      price:3.99,
      discountedPrice:2
    },{
      img:"../assets/image 3.png",
      category:"vegetable",
      productName:"Redish 500g",
      store:"Mr Food",
      price:3.99,
      discountedPrice:2
    },{
      img:"../assets/image 3.png",
      category:"vegetable",
      productName:"Redish 500g",
      store:"Mr Food",
      price:3.99,
      discountedPrice:2
    },{
      img:"../assets/image 3.png",
      category:"vegetable",
      productName:"Redish 500g",
      store:"Mr Food",
      price:3.99,
      discountedPrice:2
    },{
      img:"../assets/image 3.png",
      category:"vegetable",
      productName:"Redish 500g",
      store:"Mr Food",
      price:3.99,
      discountedPrice:2
    },
  ]
  exploreCategories = [
    {
      img:"../assets/image 3.png",
      category:"Vegetables",
      numberOfItems:"20"
    },
    {
      img:"../assets/image 3.png",
      category:"Fruits",
      numberOfItems:"20"
    },
    {
      img:"../assets/image 3.png",
      category:"Meat",
      numberOfItems:"20"
    },
    {
      img:"../assets/image 3.png",
      category:"Fruits",
      numberOfItems:"20"
    },
    {
      img:"../assets/image 3.png",
      category:"Meat",
      numberOfItems:"20"
    },
    {
      img:"../assets/image 3.png",
      category:"Vegetables",
      numberOfItems:"20"
    },
    {
      img:"../assets/image 3.png",
      category:"Fruits",
      numberOfItems:"20"
    }
  ]
  
  categories=["All","Vegetables","Fruits","Coffee & Teas","Meat"]
  groceryList:Grocery[] = [
    {
      id: 1,
      grocery_name: "Bananas",
      store: "ABC Supermarket",
      price: 0.49,
      discountPrice: null,
      rating: 4.2,
      quantity: "1 lb",
      category: "Fruits",
      imageUrl:"../../assets/Rectangle 19.png"
    },
    {
      id: 2,
      grocery_name: "Chicken Breast",
      store: "XYZ Grocery",
      price: 5.99,
      discountPrice: 4.99,
      rating: 4.5,
      quantity: "1 lb",
      category: "Meat",
      imageUrl:"../../assets/Rectangle 19.png"
    },
    {
      id: 3,
      grocery_name: "Carrots",
      store: "123 Market",
      price: 0.99,
      discountPrice: null,
      rating: 3.9,
      quantity: "1 lb",
      category: "Vegetables",
      imageUrl:"../../assets/Rectangle 19.png"
    },
    {
      id: 4,
      grocery_name: "Apples",
      store: "ABC Supermarket",
      price: 1.29,
      discountPrice: null,
      rating: 4.1,
      quantity: "1 lb",
      category: "Fruits",
      imageUrl:"../../assets/Rectangle 19.png"
    },
    {
      id: 5,
      grocery_name: "Salmon Fillet",
      store: "XYZ Grocery",
      price: 9.99,
      discountPrice: null,
      rating: 4.3,
      quantity: "1 lb",
      category: "Meat",
      imageUrl:"../../assets/Rectangle 19.png"
    },
    {
      id: 6,
      grocery_name: "Cucumbers",
      store: "123 Market",
      price: 1.49,
      discountPrice: null,
      rating: 3.8,
      quantity: "1 lb",
      category: "Vegetables",
      imageUrl:"../../assets/Rectangle 19.png"
    },
    {
      id: 7,
      grocery_name: "Oranges",
      store: "ABC Supermarket",
      price: 0.99,
      discountPrice: 0.79,
      rating: 4.0,
      quantity: "1 lb",
      category: "Fruits",
      imageUrl:"../../assets/Rectangle 19.png"
    },
    {
      id: 8,
      grocery_name: "Ground Beef",
      store: "XYZ Grocery",
      price: 6.99,
      discountPrice: null,
      rating: 4.2,
      quantity: "1 lb",
      category: "Meat",
      imageUrl:"../../assets/Rectangle 19.png"
    },
    {
      id: 9,
      grocery_name: "Broccoli",
      store: "123 Market",
      price: 1.99,
      discountPrice: null,
      rating: 3.9,
      quantity: "1 lb",
      category: "Vegetables",
      imageUrl:"../../assets/Rectangle 19.png"
    },
    {
      id: 10,
      grocery_name: "Grapes",
      store: "ABC Supermarket",
      price: 2.99,
      discountPrice: null,
      rating: 4.3,
      quantity: "1 lb",
      category: "Fruits",
      imageUrl:"../../assets/Rectangle 19.png"
    },
      {
        id: 11,
        grocery_name: "Sweet Potatoes",
        store: "Fresh Foods",
        price: 1.99,
        discountPrice: null,
        rating: 4.5,
        quantity: "1 lb",
        category: "Vegetables",
        imageUrl:"../../assets/Rectangle 19.png"
      },
      {
        id: 12,
        grocery_name: "Blueberries",
        store: "SuperMart",
        price: 2.99,
        discountPrice: null,
        rating: 4.1,
        quantity: "1 lb",
        category: "Fruits",
        imageUrl:"../../assets/Rectangle 19.png"
      },
      {
        id: 13,
        grocery_name: "Beef Ribeye Steak",
        store: "Meat King",
        price: 12.99,
        discountPrice: 9.99,
        rating: 4.8,
        quantity: "1 lb",
        category: "Meat",
        imageUrl:"../../assets/Rectangle 19.png"
      },
      {
        id: 14,
        grocery_name: "Asparagus",
        store: "Fresh Foods",
        price: 2.49,
        discountPrice: null,
        rating: 4.3,
        quantity: "1 lb",
        category: "Vegetables",
        imageUrl:"../../assets/Rectangle 19.png"
      },
      {
        id: 15,
        grocery_name: "Strawberries",
        store: "SuperMart",
        price: 3.49,
        discountPrice: null,
        rating: 4.2,
        quantity: "1 lb",
        category: "Fruits",
        imageUrl:"../../assets/Rectangle 19.png"
      },
      {
        id: 16,
        grocery_name: "Pork Loin Roast",
        store: "Meat King",
        price: 8.99,
        discountPrice: null,
        rating: 4.0,
        quantity: "1 lb",
        category: "Meat",
        imageUrl:"../../assets/Rectangle 19.png"
      },
      {
        id: 17,
        grocery_name: "Spinach",
        store: "Fresh Foods",
        price: 1.99,
        discountPrice: null,
        rating: 4.1,
        quantity: "1 lb",
        category: "Vegetables",
        imageUrl:"../../assets/Rectangle 19.png"
      },
      {
        id: 18,
        grocery_name: "Pineapple",
        store: "SuperMart",
        price: 2.99,
        discountPrice: null,
        rating: 4.4,
        quantity: "1 lb",
        category: "Fruits",
        imageUrl:"../../assets/Rectangle 19.png"
      },
      {
        id: 19,
        grocery_name: "Salmon Fillet",
        store: "Fish Market",
        price: 10.99,
        discountPrice: null,
        rating: 4.5,
        quantity: "1 lb",
        category: "Meat",
        imageUrl:"../../assets/Rectangle 19.png"
      },
      {
        id: 20,
        grocery_name: "Bell Peppers",
        store: "Fresh Foods",
        price: 1.49,
        discountPrice: null,
        rating: 4.0,
        quantity: "1 lb",
        category: "Vegetables",
        imageUrl:"../../assets/Rectangle 19.png"
      }
    ];
    
     uniqueCategory:Grocery[] = this.groceryList.filter((item, index, arr) => {
      return index === arr.findIndex(t => t.category === item.category);
    });


    filteredProducts(duplicateProducts:any, urlCategory:string) {
      if (urlCategory == "All") {
        return duplicateProducts;
      } else {
        return duplicateProducts.filter((product:any) => product.category === urlCategory);
      }
    }
    
    //  this function is for unique stores from filtered stores
    
  storesFilterData(urlCategory:string){
   let stores: string[]=[];
  const products = this.filteredProducts(this.groceryList, urlCategory);
  products.forEach((element:any) => {
    if(!stores.includes(element.store)){
      stores.push(element.store)
    }
  });
  // console.log(stores);
  return stores;
}
searchTerm: string = ''; 
filteredProductsBasedOnCategory:Grocery[]=[];
// get products based on the category
filterProducts(searchTerm:string): Grocery[] {
  console.log(this.groceryList.filter(product =>
    product.grocery_name.toLowerCase().includes(searchTerm.toLowerCase())
  ))
  this.filteredProductsBasedOnCategory = this.groceryList.filter(product =>
    product.grocery_name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return this.groceryList.filter(product =>
    product.grocery_name.toLowerCase().includes(searchTerm.toLowerCase())
  );
}
selectedCategory:string='';

 sortGroceriesByRating(): Grocery[] {
  let sortedGroceries = this.groceryList.sort((a, b) => {
    if (a.rating !== undefined && b.rating !== undefined) {
      return b.rating - a.rating;
    }
    // handle the case when one or both ratings are undefined
    // for example, you can sort by name or price instead
    return a.grocery_name.localeCompare(b.grocery_name);
  });
  return sortedGroceries.slice(0,3);
}
// getProducts() {
//   let products = this.groceryList;

//   if (this.category && this.category != "") {
//     products = products.filter(p => p.category == this.category);
//   }

//   if (this.searchTerm && this.searchTerm != "") {
//     products = products.filter(p => p.grocery_name.toLowerCase().includes(this.searchTerm.toLowerCase()));
//   }

//   return products;
// }
  }
