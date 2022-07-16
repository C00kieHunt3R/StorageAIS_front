import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Partner} from "../../../model/model";
import {MatSelect} from "@angular/material/select";

@Component({
  selector: 'app-set-partner-dialog',
  templateUrl: './set-partner-dialog.component.html',
  styleUrls: ['./../../dialogStyle.css']
})
export class SetPartnerDialogComponent implements OnInit {

  partner: Partner;
  types: string[] = ['Поставщик', 'Покупатель'];
  @ViewChild('typeSelector') typeSelector: MatSelect;

  constructor(
    public dialogRef: MatDialogRef<SetPartnerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Partner,
  ) { }

  ngOnInit(): void {
    this.partner = this.data;
  }

  onCancelClick() {
    this.dialogRef.close();
  }

  setPartner() {
    if (this.typeSelector.value == 'Поставщик') {
      this.partner.partnerType = "SUPPLIER";
    } else {
      this.partner.partnerType = "CONSUMER";
    }
    this.dialogRef.close({data: this.partner});
  }
}
