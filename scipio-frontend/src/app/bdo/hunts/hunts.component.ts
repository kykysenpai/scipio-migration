import {Component, OnInit} from '@angular/core';
import {HuntService} from "../../api/bdo/hunt.service";
import {Hunt} from "../../model/bdo/hunt";
import {Observable} from "rxjs";

@Component({
  selector: 'app-hunts',
  templateUrl: './hunts.component.html',
  styleUrls: ['./hunts.component.css']
})
export class HuntsComponent implements OnInit {

  hunts: Observable<Hunt[]>;

  constructor(private huntService: HuntService) {
  }

  ngOnInit() {
    this.updateHunts();
  }

  updateHunts() {
    this.hunts = this.huntService.getAllHunts();
  }

}
