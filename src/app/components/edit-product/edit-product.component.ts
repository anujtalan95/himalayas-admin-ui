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
  searchTagsMaster= [
    {
      "code":"Water"
    },
    {
      "code":"Air"
    },
    {
      "code":"Land"
    }
  ];
  //private  imgSrc = 'assets/684094.jpg';
  validMessage:string="";
  imageEmbeddedURL:string="";
  constructor(private productService:ProductService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.getProduct(this.route.snapshot.params.id);
    this.productEditForm = new FormGroup({
      productCode: new FormControl(),
      productName: new FormControl(),
      productDescription: new FormControl(),
      location: new FormControl(),
      status: new FormControl(),
      imageCredit: new FormControl(),
      searchTags: new FormControl(),
      imageEmbeddedURL: new FormControl()
    });
  }

  getProduct(productId:number) {
    this.productService.getProduct(productId).subscribe(
      data => 
      {this.product = data;
        this.productEditForm.controls.productCode.setValue(this.product.productCode);
        this.productEditForm.controls.productName.setValue(this.product.productName);
        this.productEditForm.controls.productDescription.setValue(this.product.productDescription);
        this.productEditForm.controls.location.setValue(this.product.location);
        this.productEditForm.controls.status.setValue(this.product.status);
        this.productEditForm.controls.imageCredit.setValue(this.product.imageCredit);
        this.productEditForm.controls.searchTags.setValue(this.product.searchTags);
        this.productEditForm.controls.imageEmbeddedURL.setValue(this.product.imageEmbeddedURL);
        this.imageEmbeddedURL = this.product.imageEmbeddedURL},
      error => console.error(error),
      () => console.log('Get Product to edit')
    );
    
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
