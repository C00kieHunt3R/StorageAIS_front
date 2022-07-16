import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Partner} from "../../../model/model";
import {MatSelect} from "@angular/material/select";

@Component({
  selector: 'app-add-partner-dialog',
  templateUrl: './add-partner-dialog.component.html',
  styleUrls: ['./../../dialogStyle.css']
})
export class AddPartnerDialogComponent implements OnInit {

  partner:Partner;

  @ViewChild('typeSelector') typeSelector: MatSelect;
  types: string[] = ['Поставщик', 'Покупатель'];

  constructor(public dialogRef: MatDialogRef<AddPartnerDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Partner,
  ) {}

  ngOnInit(): void {
    this.partner = {} as Partner;
  }

  onCancelClick() {
    this.dialogRef.close();
  }

  savePartner() {
    if (this.typeSelector.value == 'Поставщик') {
      this.partner.partnerType = "SUPPLIER";
    } else {
      this.partner.partnerType = "CONSUMER";
    }
    this.dialogRef.close({data: this.partner});
  }
}
