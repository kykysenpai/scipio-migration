import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {HuntService} from "../../api/bdo/hunt.service";
import {Hunt} from "../../model/bdo/hunt";
import {MdbTableDirective, MdbTablePaginationComponent} from "angular-bootstrap-md";

@Component({
  selector: 'app-hunts',
  templateUrl: './hunts.component.html',
  styleUrls: ['./hunts.component.css']
})
export class HuntsComponent implements OnInit, AfterViewInit {

  @ViewChild(MdbTablePaginationComponent, {static: true}) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, {static: true}) mdbTable: MdbTableDirective;
  hunts: Hunt[] = [];
  previous: Hunt[] = [];

  constructor(private huntService: HuntService, private cdRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.updateHunts();
  }

  updateHunts() {
    this.huntService.getAllHunts().subscribe((hunts) => {
      this.hunts = hunts;
      this.mdbTable.setDataSource(this.hunts);
      this.hunts = this.mdbTable.getDataSource();
      this.previous = this.mdbTable.getDataSource();
    });
  }

  ngAfterViewInit(): void {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(8);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }

}
