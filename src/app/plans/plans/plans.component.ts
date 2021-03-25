import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Plan } from "src/app/core/models/plan";
import { PlansService } from "src/app/core/services/plans.service";

@Component({
    selector: 'pndr-plans',
    templateUrl: './plans.component.html'
})
export class PlansComponent implements OnInit {
    
    public plans: Plan[] = [];
    public skip: number = 0;
    public take: number = 10;
    public name: string = '';

    constructor(private router: Router, private plansService: PlansService) { }

    ngOnInit(): void {
        this.loadPlans();
    }

    private loadPlans(): void {
        this.plansService
            .getPaged(this.skip, this.take, this.name)
            .subscribe(plans => this.plans = plans);
    }

    public createPlan(): void {
        this.router.navigateByUrl('/plans/new/details');
    }

    public editPlan(plan: Plan): void {
        console.log(plan);
    }

    public removePlan(plan: Plan): void {
        console.log(plan);
    }
}