import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  newProductForm:FormGroup;
  searchtagsVar = [
    {
      "code":"Air"
    },
    {
      "code":"Water"
    },
    {
      "code":"Land"
    }
  ];

  constructor(private productService:ProductService,private router:Router,private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.newProductForm = this.formBuilder.group({
      productCode: this.formBuilder.control(''),
      productName: this.formBuilder.control(''),
      productDescription: this.formBuilder.control(''),
      location: this.formBuilder.control(''),
      status: this.formBuilder.control(''),
      imageCredit: this.formBuilder.control(''),
      searchTags: this.formBuilder.control(''),
      dataStore: this.formBuilder.group({
        dataContent: this.formBuilder.control('')
      })
    });
  }

  addNewProduct() {
    if(this.newProductForm.valid) {
      console.log(this.newProductForm.value);
      this.productService.createProduct(this.newProductForm.value).subscribe(
        data => { this.router.navigate(['products'])},

        error => console.error(error),
        () => console.log('New Product Added')
      );
    }
  }

}
