import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Address } from "src/app/core/models/address";

@Component({
    selector: 'pndr-address-card',
    templateUrl: './address-card.component.html'
})
export class AddressCardComponent {

    @Output() public onEditAddress = new EventEmitter<Address>();
    @Output() public onRemoveAddress = new EventEmitter<Address>();

    @Input() public address: Address;

    public editAddress(): void {
        this.onEditAddress.emit(this.address);
    }

    public removeAddress(): void {
        this.onRemoveAddress.emit(this.address);
    }

}