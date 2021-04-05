import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CoreModule } from "../core/core.module";
import { CustomerComponent } from "./customer/customer.component";
import { CustomersRoutingModule } from "./customers.routing.module";
import { CustomersComponent } from "./customers/customers.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CoreModule,
        CustomersRoutingModule
    ],
    exports: [],
    declarations: [
        CustomersComponent,
        CustomerComponent
    ]
})
export class CustomersModule {

}