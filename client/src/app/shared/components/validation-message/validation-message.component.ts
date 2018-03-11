import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-validation-message',
  templateUrl: './validation-message.component.html',
  styleUrls: ['./validation-message.component.scss']
})
export class ValidationMessageComponent implements OnInit {

  @Input() public control;
  @Input() public label;

  constructor() { }

  ngOnInit() { }
}
