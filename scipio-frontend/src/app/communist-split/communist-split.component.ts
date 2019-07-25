import {Component, OnInit} from '@angular/core';
import {CommunistSplitService} from "../api/communist-split/communist-split.service";
import {CommunistSplitGroup} from "../model/communist-split/communist-split-group";

@Component({
  selector: 'app-communist-split',
  templateUrl: './communist-split.component.html',
  styleUrls: ['./communist-split.component.css']
})
export class CommunistSplitComponent implements OnInit {

  private groups: CommunistSplitGroup[];

  constructor(private communistSplitService: CommunistSplitService) {
  }

  ngOnInit() {
    this.communistSplitService.getAllGroups().subscribe((groups) => {
      this.groups = groups;
    });
  }

  updateGroups() {
    this.communistSplitService.getAllGroups();
  }


}
