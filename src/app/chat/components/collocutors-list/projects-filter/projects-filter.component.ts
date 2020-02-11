import { Component, OnInit, Output } from '@angular/core';
import { projectTypesConst } from './consts/prohects-types.const';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-projects-filter',
  templateUrl: './projects-filter.component.html',
  styleUrls: ['./projects-filter.component.scss']
})
export class ProjectsFilterComponent implements OnInit {

  public projectTypes: { name: string, type: string }[] = projectTypesConst;
  public currentType: string = 'all';
  public currentTypeName: string = 'Все';
  public isListVisible: boolean = null;
  @Output() setCurrentType = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  public toggleListOfTypes() {
    if(!this.isListVisible) {
      this.isListVisible = true;
    } else {
      this.isListVisible = !this.isListVisible;
    }
  }

  public setProjectType(type: string, name: string) {
    this.currentType = type;
    this.currentTypeName = name;
    this.setCurrentType.emit(this.currentType);
    this.isListVisible = false;
  }

}
