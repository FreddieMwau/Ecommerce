import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './Auth/Service/auth-guard.service';

const routes: Routes = [
  { path: 'login', loadChildren: () => import('./Auth/auth.module').then(auth => auth.AuthModule) },
  {path: 'shop', canActivate:[AuthGuardService], loadChildren:()=> import('./Shop/shop.module').then(shop => shop.ShopModule)},
  { path: 'admin', canActivate: [AuthGuardService], loadChildren: ()=> import('./Admin/admin.module').then(admin => admin.AdminModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
