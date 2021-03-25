import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PlanComponent } from "./plan/plan.component";
import { PlansComponent } from "./plans/plans.component";

const routes: Routes = [
    {
        path: '',
        component: PlansComponent
    },
    {
        path: ':id/details',
        component: PlanComponent
    }
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class PlansRoutingModule {

}