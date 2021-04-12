import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Order } from "src/app/core/models/order";
import { OrdersService } from "src/app/core/services/orders.service";
import { SwalService } from "src/app/shared/services/swal.service";

@Component({
    selector: 'pndr-orders',
    templateUrl: './orders.component.html'
})
export class OrdersComponent {

    public orders: Order[] = [];
    public skip: number = 0;
    public take: number = 10;
    public name: string = '';

    constructor(
        private router: Router, 
        private ordersService: OrdersService,
        private swalService: SwalService) { }

    ngOnInit(): void {
        this.loadOrders();
    }

    private loadOrders(): void {
        this.ordersService
            .getPaged(this.skip, this.take, this.name)
            .subscribe(orders => this.orders = orders);
    }

    public createOrder(): void {
        this.router.navigateByUrl('/orders/new/details');
    }

    public editOrder(order: Order): void {
        this.router.navigateByUrl(`/orders/${order.id}/details`);
    }

}