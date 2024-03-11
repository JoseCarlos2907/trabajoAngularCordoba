import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-delete-place',
  templateUrl: './confirm-delete-place.component.html',
  styleUrls: ['./confirm-delete-place.component.css']
})
export class ConfirmDeletePlaceComponent {
  mensaje: string;

  constructor(
    public dialogRef: MatDialogRef<ConfirmDeletePlaceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { mensaje: string }
  ) {
    this.mensaje = data.mensaje;
  }

  closeDialog(resultado: boolean): void {
    this.dialogRef.close(resultado);
  }
}