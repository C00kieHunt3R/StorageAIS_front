import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {PartnerService} from "../../service/partner.service";
import {AddPartnerDialogComponent} from "../../dialogs/partner/add-partner-dialog/add-partner-dialog.component";
import {SetPartnerDialogComponent} from "../../dialogs/partner/set-partner-dialog/set-partner-dialog.component";
import {MatTable} from "@angular/material/table";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Partner} from "../../model/model";

@Component({
  selector: 'app-partners-info',
  templateUrl: './partners-info.component.html',
  styleUrls: ['./../pagesStyle.css']
})
export class PartnersInfoComponent implements OnInit {

  partners: Partner[];
  displayedColumns: string[] = ['companyName', 'description', 'email', 'phone', 'partnerType', 'created', 'updated', 'actions'];

  partner: Partner;
  @ViewChild(MatTable) table: MatTable<Partner>

  constructor(
    private partnerService: PartnerService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.getPartners();
  }

  public getPartners(): void {
    this.partnerService.getAllPartners().subscribe(
      (r: Partner[]) => {
        this.partners = r;
      }
    );
  }

  set(element: Partner) {
    const index = this.partners.indexOf(element);
    const setDialogRef = this.dialog.open(SetPartnerDialogComponent,
      {
        data: element
      })
      .afterClosed().subscribe(result => {
        if (result != null) {
          this.partnerService.updatePartner(result.data).subscribe(r => {
            this.partners[index] = r;
            this.table.renderRows();
            this.snackBar.open('Изменение данных партнёра прошло успешно', 'ОК', {
              duration: 5000,
            });
          });
        }
      });
  }

  delete(element: Partner) {
    const index = this.partners.indexOf(element);
    this.partnerService.deletePartner(element.id).subscribe(r => {
      this.partners.splice(index, 1);
      this.table.renderRows();
      this.snackBar.open('Удаление партнёра прошло успешно', 'ОК', {
        duration: 5000,
      });
    });
  }

  create() {
    const createDialogRef = this.dialog.open(AddPartnerDialogComponent)
      .afterClosed().subscribe(result => {
        if (result != null) {
          this.partnerService.createPartner(result.data).subscribe(r => {
            this.partners.push(r);
            this.table.renderRows();
            this.snackBar.open('Добавление нового партнёра прошло успешно', 'ОК', {
              duration: 5000,
            });
          });
        }
      });
  }
}
