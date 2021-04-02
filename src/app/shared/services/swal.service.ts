import { Injectable } from "@angular/core";
import Swal, { SweetAlertIcon, SweetAlertOptions, SweetAlertResult } from "sweetalert2";

@Injectable({
    providedIn: 'root'
})
export class SwalService {

    public showMessage(message: string): void {
        Swal.fire(message);
    }

    public showSuccess(title: string, subtitle: string): void {
      Swal.fire(title, subtitle, 'success');
    }

    public showToast(title: string, icon: SweetAlertIcon): void {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          });
          
          Toast.fire({
            icon: icon,
            title: title
          });
    }

    public showConfirm(title: string, subtitle: string, confirmCallback: Function, cancelCallback: Function): void {
      const options: SweetAlertOptions<any, any> = {
        title: title,
        text: subtitle,
        icon: 'warning',
        showCancelButton: true,
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Confirmar'
      };

      Swal.fire(options).then((result : SweetAlertResult<any>) => {
        if (result.isConfirmed && confirmCallback) {
          confirmCallback();
          return;
        } else if (cancelCallback) {
          cancelCallback();
        }
      });
    }
}