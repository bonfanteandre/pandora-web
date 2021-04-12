import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BsModalService, ModalModule } from "ngx-bootstrap/modal";
import { CoreModule } from "../core/core.module";
import { AddressCardComponent } from "./address-card/address-card.component";
import { AddressModalComponent } from "./address-modal/address-modal.component";
import { AddressesComponent } from "./addresses/addresses.component";
import { CustomerComponent } from "./customer/customer.component";
import { CustomersRoutingModule } from "./customers.routing.module";
import { CustomersComponent } from "./customers/customers.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CoreModule,
        CustomersRoutingModule,
        ModalModule.forRoot()
    ],
    exports: [],
    declarations: [
        CustomersComponent,
        CustomerComponent,
        AddressesComponent,
        AddressCardComponent,
        AddressModalComponent
    ]
})
export class CustomersModule {

}