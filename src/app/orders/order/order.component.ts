import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { forkJoin } from "rxjs";
import { Address } from "src/app/core/models/address";
import { OperationResult } from "src/app/core/models/common/operation-result";
import { Customer } from "src/app/core/models/customer";
import { Order } from "src/app/core/models/order";
import { PaymentMethod } from "src/app/core/models/payment-method";
import { CustomersService } from "src/app/core/services/customers.service";
import { OrdersService } from "src/app/core/services/orders.service";
import { PaymentMethodsService } from "src/app/core/services/payment-methods.service";
import { SwalService } from "src/app/shared/services/swal.service";

@Component({
    selector: 'pndr-order',
    templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

    public form: FormGroup;
    public order: Order;
    public isNew: boolean = true;
    public operationResult: OperationResult;
    public customers: Customer[] = [];
    public addresses: Address[] = [];
    public paymentMethods: PaymentMethod[] = [];

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private ordersService: OrdersService,
        private customersService: CustomersService,
        private paymentMethodsService: PaymentMethodsService,
        private swalService: SwalService) { }

    public ngOnInit(): void {
        forkJoin({
            customers: this.customersService.getAll(),
            paymentMethods: this.paymentMethodsService.getAll()
        })
        .subscribe(({customers, paymentMethods}) => {
            this.customers = customers;
            this.paymentMethods = paymentMethods;
            this.route.params.subscribe(params => {
                this.isNew = params.id === 'new';
                this.isNew ?
                    this.newOrder() :
                    this.loadOrder(params.id);
            });
        });
    }
    
    private newOrder(): void {
        this.order = new Order();
        this.buildForm();
    }

    private loadOrder(id: string): void {
        this.ordersService
        .getById(id)
        .subscribe(order => {
            this.order = order;
            const costumer = this.customers.find(c => c.id == this.order.customerId);
            this.addresses = costumer.addresses;
            this.buildForm();
        })
    }

    private buildForm(): void {
        this.form = this.formBuilder.group({
            customerId: [this.order.customerId, Validators.required],
            addressId: [this.order.addressId, Validators.required],
            paymentMethodId: [this.order.paymentMethodId, Validators.required],
            deliverAt: [this.order.deliverAt, Validators.required],
            observations: [this.order.observations]
        });
    }

    public selectCustomer(customerId: string): void {
        const costumer = this.customers.find(c => c.id == customerId);
        this.addresses = costumer.addresses;
    }

    public saveOrder(): void {
        this.setOrderData();
        this.isNew ? 
            this.createOrder() :
            this.updateOrder();
    }

    private setOrderData() {
        this.order.customerId = this.form.get('customerId').value;
        this.order.addressId = this.form.get('addressId').value;
        this.order.paymentMethodId = this.form.get('paymentMethodId').value;
        this.order.deliverAt = this.form.get('deliverAt').value;
        this.order.observations = this.form.get('observations').value;
    }

    private createOrder(): void {
        this.ordersService
            .create(this.order)
            .subscribe(result => {
                this.order.id = result.entity.id;
                this.isNew = false;
                this.swalService.showToast('Pedido criado com sucesso!', 'success');
            });
    }

    private updateOrder(): void {
        this.ordersService
            .update(this.order)
            .subscribe(() => {
                this.swalService.showToast('Pedido atualizado com sucesso!', 'success');
            });
    }

    public onItemsChange(): void {
        this.loadOrder(this.order.id);
    }
}