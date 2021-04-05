import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Customer } from "src/app/core/models/customer";
import { CustomersService } from "src/app/core/services/customers.service";
import { SwalService } from "src/app/shared/services/swal.service";

@Component({
    selector: 'pndr-customers',
    templateUrl: './customers.component.html'
})
export class CustomersComponent {

    public customers: Customer[] = [];
    public skip: number = 0;
    public take: number = 10;
    public name: string = '';

    constructor(
        private router: Router, 
        private customersService: CustomersService,
        private swalService: SwalService) { }

    ngOnInit(): void {
        this.loadCustomer();
    }

    private loadCustomer(): void {
        this.customersService
            .getPaged(this.skip, this.take, this.name)
            .subscribe(customers => this.customers = customers);
    }

    public createCustomer(): void {
        this.router.navigateByUrl('/customers/new/details');
    }

    public editCustomer(customer: Customer): void {
        this.router.navigateByUrl(`/customers/${customer.id}/details`);
    }

    public removeCustomer(customer: Customer): void {
        this.swalService.showConfirm('Tem certeza que deseja remover este cliente?', '',
        () => {
            this.customersService
                .remove(customer)
                .subscribe(() => {
                    this.swalService.showToast('Cliente removido com sucesso!', 'success');
                    this.loadCustomer();
                });
        },
        () => {});
    }
}