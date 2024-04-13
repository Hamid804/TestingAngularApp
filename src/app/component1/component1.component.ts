import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogBoxComponent } from '../shared/confirm-dialog-box/confirm-dialog-box.component';
import { BehaviorSubject, Observable } from 'rxjs';

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-component1',
  templateUrl: './component1.component.html',
  styleUrls: ['./component1.component.scss'],
})
export class Component1Component implements OnInit, OnDestroy {
  checkboxState: boolean = false;
  count: number = 0;
  dialogOpen: boolean = false;

  isMenuButtonShow:boolean = false;
  isNavbarShow:boolean = true;

  booleanSubject = new BehaviorSubject<boolean>(false);

  constructor(public dialog: MatDialog, private responsive:BreakpointObserver) {}

  ngOnInit(): void {
    this.booleanSubject.subscribe((data) => {
      if (data) {
        console.log(this.booleanSubject.getValue());
        this.dialogBoxOpen();
      }
    });

    this.responsive.observe(['(max-width: 750px)']).subscribe((screenSize) => {
      if(screenSize.matches) {
        this.isMenuButtonShow = true;
        this.isNavbarShow = false;
      }else {
        this.isMenuButtonShow = false;
        this.isNavbarShow = true;
      }
    });
  }

  openNavBar() {
    console.log("opened");
    this.isNavbarShow = !this.isNavbarShow;
  }

  openDialog() {
    this.dialogOpen = !this.dialogOpen;
    this.booleanSubject.next(this.dialogOpen);
  }

  dialogBoxOpen() {
    const dialogRef = this.dialog.open(ConfirmDialogBoxComponent, {
      data: {
        title: 'Confirlmation Dialog',
        description:
          'Driver you are trying to add it is alraedy exist, you want to active this one ?',
      },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Yes clicked');
      } else {
        console.log('No clicked');
      }
    });
  }

  checkFun() {
    this.count++;
  }

  myFunToCheck() {
    console.log('India');
  }

  ngOnDestroy(): void {
    this.booleanSubject.unsubscribe();
  }
}
