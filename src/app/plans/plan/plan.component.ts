import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { OperationResult } from "src/app/core/models/common/operation-result";
import { Plan } from "src/app/core/models/plan";
import { PlansService } from "src/app/core/services/plans.service";
import { SwalService } from "src/app/shared/services/swal.service";

@Component({
    selector: 'pndr-plan',
    templateUrl: 'plan.component.html'
})
export class PlanComponent implements OnInit {

    public plan: Plan;
    public isNew: boolean = true;
    public operationResult: OperationResult;
    public form: FormGroup;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder, 
        private plansService: PlansService,
        private swalService: SwalService) { }

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
        this.operationResult = null;
        this.plansService.create(this.plan).subscribe(
            () => {
                this.swalService.showToast('Plano criado com sucesso!', 'success');
                this.router.navigateByUrl('/plans');
            },
            (result: OperationResult) => this.operationResult = result);
    }
    

    private updatePlan(): void {
        this.operationResult = null;
        this.plansService.update(this.plan).subscribe(
            () => {
                this.swalService.showToast('Plano atualizado com sucesso!', 'success');
                this.router.navigateByUrl('/plans');
            },
            (result: OperationResult) => this.operationResult = result);
    }
}