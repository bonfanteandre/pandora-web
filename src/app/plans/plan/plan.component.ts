import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Plan } from "src/app/core/models/plan";
import { PlansService } from "src/app/core/services/plans.service";

@Component({
    selector: 'pndr-plan',
    templateUrl: 'plan.component.html'
})
export class PlanComponent implements OnInit {

    public plan: Plan;
    public isNew: boolean = true;

    public form: FormGroup;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder, 
        private plansService: PlansService) { }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.isNew = params.id === 'new';
            this.isNew ?
                this.newPlan() :
                this.loadPlan(params.id);
        });
    }

    private newPlan(): void {
        this.plan = new Plan();
        this.buildForm();
    }

    private loadPlan(id: any) {
        this.plansService
            .getById(id)
            .subscribe(plan => {
                this.plan = plan;
                this.buildForm();
            });
    }

    private buildForm(): void {
        this.form = this.formBuilder.group({
            name: [this.plan.name, Validators.required],
            price: [this.plan.price, Validators.required]
        });
    }

    public savePlan(): void {
        this.setPlanData();
        this.isNew ?
            this.createPlan() :
            this.updatePlan();
    }

    private setPlanData(): void {
        this.plan.name = this.form.get('name').value;
        this.plan.price = parseFloat(this.form.get('price').value);
    }

    private createPlan(): void {
        this.plansService.create(this.plan)
            .subscribe(() => {
                alert('Plano criado com sucesso!');
                this.router.navigateByUrl('/plans');
            });
    }

    private updatePlan(): void {
        this.plansService.update(this.plan)
            .subscribe(() => {
                alert('Plano atualizado com sucesso!');
                this.router.navigateByUrl('/plans');
            });
    }
}