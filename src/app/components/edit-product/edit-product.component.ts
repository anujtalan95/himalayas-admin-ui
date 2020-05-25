import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup,FormControl,Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  public product;
  productEditForm:FormGroup;
  //private  imgSrc = 'assets/684094.jpg';
  validMessage:string="";
  constructor(private productService:ProductService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.getProduct(this.route.snapshot.params.id);
    this.productEditForm = new FormGroup({
      productCode: new FormControl(''),
      productName: new FormControl(''),
      productDescription: new FormControl(''),
      location: new FormControl(''),
      status: new FormControl(''),
      imageCredit: new FormControl(''),
      searchTags: new FormControl(''),
      imageStore: new FormControl()
    });
  }

  getProduct(productId:number) {
    this.productService.getProduct(productId).subscribe(
      data => (this.product = data),
      error => console.error(error),
      () => console.log('Get Product to edit')
    );
    this.productEditForm.patchValue({
      productCode : this.product.productCode
    });
  }

  submitUpdateProduct(id:number) {
    if(this.productEditForm.valid) {
      this.validMessage="Form Submitted !";
      this.productService.updateProduct(this.productEditForm.value,id).subscribe(
        data => {
          this.router.navigate(['products']);
        },
        error => console.error(error),
        () => console.log('Product updated successfully !')
      );
    }
    
  }

}
