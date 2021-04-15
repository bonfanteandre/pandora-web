import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ModalModule } from "ngx-bootstrap/modal";
import { CoreModule } from "../core/core.module";
import { OrdersRoutingModule } from "./orders.routing.module";
import { OrderComponent } from "./order/order.component";
import { OrdersComponent } from "./orders/orders.component";
import { OrdereItemsTableComponent } from "./order-items-table/order-items-table.component";
import { OrderItemFormComponent } from "./order-item-form/order-item-form.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CoreModule,
        OrdersRoutingModule,
        ModalModule.forRoot()
    ],
    declarations: [
        OrdersComponent,
        OrderComponent,
        OrdereItemsTableComponent,
        OrderItemFormComponent
    ]
})
export class OrdersModule {

}