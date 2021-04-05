import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { OperationResult } from "src/app/core/models/common/operation-result";
import { Customer } from "src/app/core/models/customer";
import { Plan } from "src/app/core/models/plan";
import { CustomersService } from "src/app/core/services/customers.service";
import { PlansService } from "src/app/core/services/plans.service";
import { SwalService } from "src/app/shared/services/swal.service";

@Component({
    selector: 'pndr-customer',
    templateUrl: './customer.component.html'
})
export class CustomerComponent {

    public customer: Customer;
    public isNew: boolean = true;
    public operationResult: OperationResult;
    public form: FormGroup;
    public plans: Plan[] = [];

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder, 
        private customersService: CustomersService,
        private plansService: PlansService,
        private swalService: SwalService) { }

    ngOnInit(): void {
        this.loadPlans();
        this.route.params.subscribe(params => {
            this.isNew = params.id === 'new';
            this.isNew ?
                this.newCustomer() :
                this.loadCustomer(params.id);
        });
    }

    private loadPlans(): void {
        this.plansService
            .getAll()
            .subscribe(plans => {
                this.plans = [new Plan({
                        id: null,
                        name: '[Selecione um plano]'
                    })];
                this.plans = this.plans.concat(...plans);
            });
    }

    private newCustomer(): void {
        this.customer = new Customer();
        this.buildForm();
    }

    private loadCustomer(id: any) {
        this.customersService
            .getById(id)
            .subscribe(customer => {
                this.customer = customer;
                this.buildForm();
            });
    }

    private buildForm(): void {
        this.form = this.formBuilder.group({
            name: [this.customer.name, Validators.required],
            phoneNumber: [this.customer.phoneNumber, Validators.required],
            plan: [this.customer.planId]
        });
    }

    public saveCustomer(): void {
        this.setCustomerData();
        this.isNew ?
            this.createCustomer() :
            this.updateCustomer();
    }

    private setCustomerData(): void {
        this.customer.name = this.form.get('name').value;
        this.customer.phoneNumber = this.form.get('phoneNumber').value;

        const planId = this.form.get('plan').value;
        this.customer.planId = planId ? planId : null;
    }

    private createCustomer(): void {
        this.operationResult = null;
        this.customersService.create(this.customer).subscribe(
            () => {
                this.swalService.showToast('Cliente criado com sucesso!', 'success');
                this.router.navigateByUrl('/customers');
            },
            (result: OperationResult) => this.operationResult = result);
    }
    

    private updateCustomer(): void {
        this.operationResult = null;
        this.customersService.update(this.customer).subscribe(
            () => {
                this.swalService.showToast('Cliente atualizado com sucesso!', 'success');
                this.router.navigateByUrl('/customers');
            },
            (result: OperationResult) => this.operationResult = result);
    }
}