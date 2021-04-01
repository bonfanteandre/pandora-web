import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PaymentMethodComponent } from "./payment-method/payment-method.component";
import { PaymentMethodsComponent } from "./payment-methods/payment-methods.component";

const routes: Routes = [
    {
        path: '',
        component: PaymentMethodsComponent
    },
    {
        path: ':id/details',
        component: PaymentMethodComponent
    }
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class PaymentMethodsRoutingModule {

}