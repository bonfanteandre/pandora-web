import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PaymentMethodComponent } from "./payment-method/payment-method.component";
import { PaymentMethodsRoutingModule } from "./payment-methods.routing.module";
import { PaymentMethodsComponent } from "./payment-methods/payment-methods.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        PaymentMethodsRoutingModule
    ],
    exports: [],
    declarations: [
        PaymentMethodsComponent,
        PaymentMethodComponent
    ]
})
export class PaymentMethodsModule {

}