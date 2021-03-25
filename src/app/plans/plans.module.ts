import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { PlansRoutingModule } from "./plans.routing.module";
import { PlansComponent } from "./plans/plans.component";

@NgModule({
    imports: [
        CommonModule,
        PlansRoutingModule
    ],
    exports: [],
    declarations: [
        PlansComponent
    ]
})
export class PlansModule {

}