import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Order } from "src/app/core/models/order";
import { OrderItem } from "src/app/core/models/order-item";
import { OrderItemsService } from "src/app/core/services/order-items.service";
import { SwalService } from "src/app/shared/services/swal.service";

@Component({
    selector: 'pndr-order-items-table',
    templateUrl: './order-items-table.component.html'
})
export class OrdereItemsTableComponent {

    @Output() public onRemoveItem = new EventEmitter<void>();
    @Input() public order: Order;

    constructor(
        private swalService: SwalService,
        private orderItemsServices: OrderItemsService) { }

    public removeItem(item: OrderItem): void {
        this.orderItemsServices
            .remove(item)
            .subscribe(() => {
                this.onRemoveItem.emit();
                this.swalService.showToast('Item removido com sucesso!', 'success');
            })
    }

}