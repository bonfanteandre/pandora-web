import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { PaymentMethod } from "src/app/core/models/payment-method";
import { PaymentMethodsService } from "src/app/core/services/payment-methods.service";

@Component({
    selector: 'pndr-payment-methods',
    templateUrl: './payment-methods.component.html'
})
export class PaymentMethodsComponent {

    public paymentMethods: PaymentMethod[] = [];
    public skip: number = 0;
    public take: number = 10;
    public name: string = '';

    constructor(private router: Router, private paymentMethodsService: PaymentMethodsService) { }

    ngOnInit(): void {
        this.loadPaymentMethods();
    }

    private loadPaymentMethods(): void {
        this.paymentMethodsService
            .getPaged(this.skip, this.take, this.name)
            .subscribe(paymentMethods => this.paymentMethods = paymentMethods);
    }

    public createPaymentMethod(): void {
        this.router.navigateByUrl('/payment-methods/new/details');
    }

    public editPaymentMethod(paymentMethod: PaymentMethod): void {
        this.router.navigateByUrl(`/payment-methods/${paymentMethod.id}/details`);
    }

    public removePaymentMethod(paymentMethod: PaymentMethod): void {
        const remove = confirm('Tem certeza que deseja remover esta forma de pagamento?');
        if (remove) {
            this.paymentMethodsService
                .remove(paymentMethod)
                .subscribe(() => {
                    alert('Forma de pagamento removido com sucesso!');
                    this.loadPaymentMethods();
                });
        }
    }

}