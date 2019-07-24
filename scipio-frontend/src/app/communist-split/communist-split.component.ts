import { Component, OnInit } from '@angular/core';
import {CommunistSplitService} from "../api/communist-split.service";
import {CommunistSplitGroup} from "../model/communist-split-group";

@Component({
  selector: 'app-communist-split',
  templateUrl: './communist-split.component.html',
  styleUrls: ['./communist-split.component.css']
})
export class CommunistSplitComponent implements OnInit {

  constructor(private communistSplitService: CommunistSplitService) { }

  private groups: CommunistSplitGroup[];

  ngOnInit() {
    this.communistSplitService.getAllGroups().subscribe((response) => {
      console.log(response);
      this.groups = response;
    }, (err) => {
      console.error(err);
    })
  }



}
