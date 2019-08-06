import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-footer-steps',
  templateUrl: './footer-steps.component.html',
  styleUrls: ['./footer-steps.component.scss']
})
export class FooterStepsComponent implements OnInit {

  @Input() steps: string[];
  @Input() currentStep: number;
  @Output() currentStepChange: EventEmitter<number> = new EventEmitter<number>();

  constructor() {
  }

  ngOnInit() {
  }

  changeStep(newValue: number) {
    this.currentStep = newValue;
    this.currentStepChange.emit(this.currentStep);
  }

}
