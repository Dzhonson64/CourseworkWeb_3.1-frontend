import {Component, ComponentFactoryResolver, ElementRef, Inject, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {DialogOverviewComponent} from '../../../../../common-modules/dialog-overview/dialog-overview.component';
import {MatMenuTrigger} from '@angular/material/menu';
import {TreeCatalogActionType} from '../../../../../../models/type/TreeCatalogActionType';
export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-catalog-item',
  templateUrl: './catalog-item.component.html',
  styleUrls: ['./catalog-item.component.scss']
})
export class CatalogItemComponent implements OnInit {
  actionType = TreeCatalogActionType;
  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;
  @ViewChild('catalog', { read: ViewContainerRef }) catalogElem: any;

  constructor(public dialog: MatDialog, private componentFactoryResolver: ComponentFactoryResolver) { }



  ngOnInit(): void {
  }

  addNewBranch(){

    let bookItemComponent = this.componentFactoryResolver.resolveComponentFactory(CatalogItemComponent);
    let bookItemComponentRef = this.catalogElem.viewContainerRef.createComponent(bookItemComponent);


  }


  openDialog(actionType:TreeCatalogActionType): void {
    console.log(actionType)
    if (actionType == TreeCatalogActionType.NEW_BRANCH) {
      this.addNewBranch()
    }
    if (actionType == TreeCatalogActionType.OLD_BRANCH) {

    }
    // const dialogRef = this.dialog.open(DialogOverviewComponent, {restoreFocus: false});
    //
    // // Manually restore focus to the menu trigger since the element that
    // // opens the dialog won't be in the DOM any more when the dialog closes.
    // dialogRef.afterClosed().subscribe(() => this.menuTrigger.focus());
  };
}
