import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { PaymentMethodsModule } from './payment-methods/payment-methods.module';
import { PlansModule } from './plans/plans.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    PlansModule,
    PaymentMethodsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
