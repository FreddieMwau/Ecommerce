import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'shop', loadChildren:()=> import('./Shop/shop.module').then(shop => shop.ShopModule)},
  {path: 'login', loadChildren:()=> import('./Auth/auth.module').then(auth => auth.AuthModule)},
  {path:'admin', loadChildren: ()=> import('./Admin/admin.module').then(admin => admin.AdminModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
