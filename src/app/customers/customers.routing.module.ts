import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CustomerComponent } from "./customer/customer.component";
import { CustomersComponent } from "./customers/customers.component";

const routes: Routes = [
    {
        path: '',
        component: CustomersComponent
    },
    {
        path: ':id/details',
        component: CustomerComponent
    }
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class CustomersRoutingModule {

}