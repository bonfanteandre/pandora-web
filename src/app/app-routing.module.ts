import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
      path: '',
      pathMatch: 'full',
      redirectTo: 'home'
  },
  {
      path: 'home',
      component: HomeComponent
  },
  {
    path: 'plans',
    loadChildren: './plans/plans.module#PlansModule'
  },
  {
    path: 'payment-methods',
    loadChildren: './payment-methods/payment-methods.module#PaymentMethodsModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
