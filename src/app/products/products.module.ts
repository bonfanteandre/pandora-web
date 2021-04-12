import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ModalModule } from "ngx-bootstrap/modal";
import { CoreModule } from "../core/core.module";
import { ProductComponent } from "./product/product.component";
import { ProductsRoutingModule } from "./products.routing.module";
import { ProductsComponent } from "./products/products.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CoreModule,
        ProductsRoutingModule,
        ModalModule.forRoot()
    ],
    declarations: [
        ProductsComponent,
        ProductComponent
    ]
})
export class ProductsModule {

}