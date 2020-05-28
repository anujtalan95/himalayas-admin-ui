import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  public products;

  constructor(private productService:ProductService, private router:Router) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this.productService.getproducts().subscribe(
      data => {this.products = data},
      error => console.error(error),
      () =>  console.log('Product Loaded')
    );
  }

  deleteProduct(productBody) {
    this.productService.deleteProduct(productBody.id).subscribe(
      data => {
        this.router.navigate(['products']);
      },
      error => console.error(error),
      () => console.log("Product Deleted")
    );
  }

}
