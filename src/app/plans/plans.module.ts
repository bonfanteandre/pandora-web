import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PlanComponent } from "./plan/plan.component";
import { PlansRoutingModule } from "./plans.routing.module";
import { PlansComponent } from "./plans/plans.component";

@NgModule({
    imports: [
        CommonModule,
        PlansRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [],
    declarations: [
        PlansComponent,
        PlanComponent
    ]
})
export class PlansModule {

}