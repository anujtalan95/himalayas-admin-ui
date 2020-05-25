import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type' : 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  getproducts() {
    return this.http.get('/server/api/product',httpOptions);
  }

  getProduct(id:number) {
    return this.http.get('/server/api/product/'+id,httpOptions);
  }

  createProduct(product) {
    let body = JSON.stringify(product);
    return this.http.post('/server/api/product',body,httpOptions);
  }

  updateProduct(product,id:number) {
    let body = JSON.stringify(product);
    console.log(body);
    return this.http.put('/server/api/product/'+id+'/update',body,httpOptions);
  }

  deleteProduct(id:number) {
    return this.http.delete('/server/api/product/'+id+'/delete',httpOptions);
  }
}
