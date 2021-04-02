import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Plan } from "src/app/core/models/plan";
import { PlansService } from "src/app/core/services/plans.service";
import { SwalService } from "src/app/shared/services/swal.service";

@Component({
    selector: 'pndr-plans',
    templateUrl: './plans.component.html'
})
export class PlansComponent implements OnInit {
    
    public plans: Plan[] = [];
    public skip: number = 0;
    public take: number = 10;
    public name: string = '';

    constructor(
        private router: Router, 
        private plansService: PlansService,
        private swalService: SwalService) { }

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
        this.router.navigateByUrl(`/plans/${plan.id}/details`);
    }

    public removePlan(plan: Plan): void {
        this.swalService.showConfirm('Tem certeza que deseja remover este plano?', '',
        () => {
            this.plansService
                .remove(plan)
                .subscribe(() => {
                    this.swalService.showToast('Plano removido com sucesso!', 'success');
                    this.loadPlans();
                });
        },
        () => {});
    }
}