import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { OperationResult } from "src/app/core/models/common/operation-result";
import { PaymentMethod } from "src/app/core/models/payment-method";
import { PaymentMethodsService } from "src/app/core/services/payment-methods.service";
import { SwalService } from "src/app/shared/services/swal.service";

@Component({
    selector: 'pndr-payment-method',
    templateUrl: './payment-method.component.html'
})
export class PaymentMethodComponent {

    public paymentMethod: PaymentMethod;
    public isNew: boolean = true;
    public operationResult: OperationResult;
    public form: FormGroup;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder, 
        private paymentMethodsService: PaymentMethodsService,
        private swalService: SwalService) { }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.isNew = params.id === 'new';
            this.isNew ?
                this.newPaymentMethod() :
                this.loadPaymentMethod(params.id);
        });
    }

    private newPaymentMethod(): void {
        this.paymentMethod = new PaymentMethod();
        this.buildForm();
    }

    private loadPaymentMethod(id: any) {
        this.paymentMethodsService
            .getById(id)
            .subscribe(paymentMethod => {
                this.paymentMethod = paymentMethod;
                this.buildForm();
            });
    }

    private buildForm(): void {
        this.form = this.formBuilder.group({
            name: [this.paymentMethod.name, Validators.required]
        });
    }

    public savePaymentMethod(): void {
        this.setPaymentMethodData();
        this.isNew ?
            this.createPaymentMethod() :
            this.updatePaymentMethod();
    }

    private setPaymentMethodData(): void {
        this.paymentMethod.name = this.form.get('name').value;
    }

    private createPaymentMethod(): void {
        this.operationResult = null;
        this.paymentMethodsService.create(this.paymentMethod).subscribe(
            () => {
                this.swalService.showToast('Forma de pagamento criada com sucesso!', 'success');
                this.router.navigateByUrl('/payment-methods');
            },
            (result: OperationResult) => this.operationResult = result);
    }

    private updatePaymentMethod(): void {
        this.operationResult = null;
        this.paymentMethodsService.update(this.paymentMethod).subscribe(
            () => {
                this.swalService.showToast('Forma de pagamento atualizada com sucesso!', 'success');
                this.router.navigateByUrl('/payment-methods');
            },
            (result: OperationResult) => this.operationResult = result);
    }
}