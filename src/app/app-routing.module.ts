import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from './components/product/product.component';
import { AppComponent } from './app.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';


const routes: Routes = [
  {
    path:'products',
    component:ProductComponent
  },
  {
    path:'product/edit/:id',
    component:EditProductComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
