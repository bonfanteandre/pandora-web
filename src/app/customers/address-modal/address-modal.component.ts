import { Component, Input, OnInit,  ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BsModalRef, BsModalService, ModalDirective } from "ngx-bootstrap/modal";
import { Address } from "src/app/core/models/address";
import { OperationResult } from "src/app/core/models/common/operation-result";
import { AddressService } from "src/app/core/services/address.service";
import { SwalService } from "src/app/shared/services/swal.service";

@Component({
    selector: 'pndr-address-modal',
    templateUrl: './address-modal.component.html'
})
export class AddressModalComponent implements OnInit {
    
    @ViewChild('modal', { static: false }) public addressModal: ModalDirective;

    @Input() public address: Address;
    @Input() public isNew: boolean = true;

    public form: FormGroup;
    public operationResult: OperationResult;

    constructor(
        private formBuilder: FormBuilder,
        private modalService: BsModalService,
        private addressService: AddressService,
        private swalService: SwalService) { }

    ngOnInit(): void {
        this.buildForm();
    }

    private buildForm(): void {
        this.form = this.formBuilder.group({
            street: [this.address.street, Validators.required],
            number: [this.address.number, Validators.required],
            neighborhood: [this.address.neighborhood, Validators.required],
            reference: [this.address.reference, Validators.required]
        });
    }

    public saveAddress(): void {
        this.setAddressData();
        this.isNew ? 
            this.createAddress() : 
            this.updateAddress();
    }

    private setAddressData() {
        this.address.street = this.form.get('street').value;
        this.address.number = this.form.get('number').value;
        this.address.neighborhood = this.form.get('neighborhood').value;
        this.address.reference = this.form.get('reference').value;
    }

    private createAddress(): void {
        this.addressService
            .create(this.address)
            .subscribe(() => {
                this.swalService.showToast('Endereço criado com sucesso!', 'success');
                this.close();
            },
            (result: OperationResult) => this.operationResult = result);
    }

    private updateAddress(): void {
        this.addressService
            .update(this.address)
            .subscribe(() => {
                this.swalService.showToast('Endereço atualizado com sucesso!', 'success');
                this.close();
            },
            (result: OperationResult) => this.operationResult = result);
    }

    public close(): void {
        this.modalService.hide();
    }
}