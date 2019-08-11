import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {CommunistSplitGroup} from "../../model/communist-split/communist-split-group";
import {CommunistSplitService} from "../../api/communist-split/communist-split.service";
import {CommunistSplitPayment} from "../../model/communist-split/communist-split-payment";
import {MDBModalService, MdbTableDirective, MdbTablePaginationComponent} from "angular-bootstrap-md";
import {NewPaymentModalComponent} from "../new-payment-modal/new-payment-modal.component";
import {PaymentDetailsModalComponent} from "../payment-details-modal/payment-details-modal.component";
import {User} from "../../model/user";
import {Observable} from "rxjs";
import {UsersService} from "../../api/users.service";

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit, AfterViewInit {

  @Output() paymentsChange: EventEmitter<CommunistSplitPayment[]> = new EventEmitter<CommunistSplitPayment[]>();

  @ViewChild(MdbTablePaginationComponent, {static: true}) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, {static: true}) mdbTable: MdbTableDirective;

  payments: CommunistSplitPayment[] = [];
  previous: CommunistSplitPayment[] = [];
  currentGroup: CommunistSplitGroup;
  currentUser: Observable<User>;

  constructor(private communistSplitService: CommunistSplitService, private modalService: MDBModalService, private usersService: UsersService, private cdRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.currentUser = this.usersService.getCurrentUser();
    this.updateAllPayments();
  }

  @Input()
  set setCurrentGroup(currentGroup: CommunistSplitGroup) {
    this.currentGroup = currentGroup;
    this.updateAllPayments();
  }

  updateAllPayments() {
    this.communistSplitService.getAllPaymentsForGroup(this.currentGroup).subscribe(payments => {
      this.payments = payments;
      this.mdbTable.setDataSource(this.payments);
      this.payments = this.mdbTable.getDataSource();
      this.previous = this.mdbTable.getDataSource();
      this.paymentsChange.emit(this.payments);
    });
  }

  ngAfterViewInit(): void{
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(8);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }

  showPaymentCreationModal() {
    let modalRef = this.modalService.show(NewPaymentModalComponent, {
      class: "modal-lg",
      containerClass: "overflow-modal",
      data: {
        group: this.currentGroup
      }
    });

    modalRef.content.action.subscribe(() => {
      this.updateAllPayments();
    })
  }

  openDetails(payment: CommunistSplitPayment) {
    this.modalService.show(PaymentDetailsModalComponent, {
      data: {
        payment: payment
      }
    })
  }

}
