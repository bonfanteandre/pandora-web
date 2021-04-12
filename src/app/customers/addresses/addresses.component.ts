import { Component, Input } from "@angular/core";
import { Customer } from "src/app/core/models/customer";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { AddressModalComponent } from "../address-modal/address-modal.component";
import { Address } from "src/app/core/models/address";
import { SwalService } from "src/app/shared/services/swal.service";
import { AddressService } from "src/app/core/services/address.service";

@Component({
    selector: 'pndr-addresses',
    templateUrl: './addresses.component.html'
})
export class AddressesComponent {
    
    @Input() public customer: Customer;

    private addressModal: BsModalRef;

    constructor(
        private modalService: BsModalService, 
        private swalService: SwalService,
        private addressService: AddressService) {}

    public newAddress(): void {
        const newAddress = new Address();
        newAddress.customerId = this.customer.id;
        this.openModalAddress(newAddress, true);
    }

    public onEditAddress(address: Address): void {
        this.openModalAddress(address, false);
    }

    private openModalAddress(address: Address, isNew: boolean): void {
        const initialState = {
            address,
            isNew
        };
        this.addressModal = this.modalService.show(AddressModalComponent, { initialState });
    }

    public onRemoveAddress(address: Address): void {
        this.swalService.showConfirm('Tem certeza que deseja remover este endereço?', '',
        () => {
            this.addressService
                .remove(address)
                .subscribe(() => {
                    this.swalService.showToast('Endereço removido com sucesso!', 'success');
                    this.setAddresses(address);
                });
        },
        () => {});
    }

    private setAddresses(address: Address) {
        this.customer.addresses = this.customer.addresses.filter(a => a.id != address.id);
    }
}