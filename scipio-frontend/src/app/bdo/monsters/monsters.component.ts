import {Component, OnInit} from '@angular/core';
import {HuntService} from "../../api/bdo/hunt.service";
import {Monster} from "../../model/bdo/monster";
import {Observable} from "rxjs";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-monsters',
  templateUrl: './monsters.component.html',
  styleUrls: ['./monsters.component.css']
})
export class MonstersComponent implements OnInit {

  monsters: Observable<Monster[]>;

  newMonsterForm = new FormGroup({
    name: new FormControl(),
    value: new FormControl()
  });

  constructor(private huntService: HuntService) {
  }

  ngOnInit() {
    this.updateMonsters();
  }

  updateMonsters() {
    this.monsters = this.huntService.getAllMonsters();
  }

  createMonster() {
    let monster: Monster = {
      id: null,
      name: this.newMonsterForm.get("name").value,
      value: this.newMonsterForm.get("value").value
    };
    this.huntService.createMonster(monster).toPromise().then((monster) => {
      this.updateMonsters();
      this.newMonsterForm.reset();
    });
  }

  deleteMonster(monster: Monster) {
    this.huntService.deleteMonster(monster).subscribe(() => {
      this.updateMonsters();
      console.log("deleted : " + monster);
    })


  }

  patchMonster(id, name, value) {
    let monster: Monster = {
      id: id,
      name: name,
      value: value
    };
    this.huntService.patchMonster(monster).subscribe((monster) => {
      console.log("updated", monster);
    });
  }
}
