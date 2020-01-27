import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewProductComponent } from './new-product/new-product.component';
import { ShowProductComponent } from './show-product/show-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';

const routes: Routes = [
  { path: 'new',component: NewProductComponent },
  { path: 'show/:id_num',component: ShowProductComponent },
  { path: 'edit/:id_num',component: EditProductComponent },
  { path: 'remove/:id_num', redirectTo: '/remove/:id_num' },
  { path: '', pathMatch: 'full', redirectTo: '/' },
  { path: '**', pathMatch: 'full', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
