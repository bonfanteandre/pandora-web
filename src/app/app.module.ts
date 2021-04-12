import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { CustomersModule } from './customers/customers.module';
import { PaymentMethodsModule } from './payment-methods/payment-methods.module';
import { PlansModule } from './plans/plans.module';
import { ProductsModule } from './products/products.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    PlansModule,
    PaymentMethodsModule,
    CustomersModule,
    ProductsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
