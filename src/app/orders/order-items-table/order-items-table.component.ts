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
        this.swalService.showConfirm('Tem certeza que deseja remover o item?', '', () => {
            this.orderItemsServices
            .remove(item)
            .subscribe(() => {
                this.onRemoveItem.emit();
                this.swalService.showToast('Item removido com sucesso!', 'success');
            })
        }, null); 
    }

    public decrementItemAmount(item: OrderItem): void {
        if ((item.amount - 1) <= 0) {
            return;
        }

        item.amount -= 1;
        item.price = item.amount * item.unitValue;
        this.orderItemsServices
            .update(item)
            .subscribe(() => {});
    }

    public incrementItemAmount(item: OrderItem): void {
        item.amount += 1;
        item.price = item.amount * item.unitValue;
        this.orderItemsServices
            .update(item)
            .subscribe(() => {});
    }

}