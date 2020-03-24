import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { projectTypesConst } from './consts/prohects-types.const';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';

@Component({
  selector: 'app-projects-filter',
  templateUrl: './projects-filter.component.html',
  styleUrls: ['./projects-filter.component.scss']
})
export class ProjectsFilterComponent implements OnInit {

  public projectTypes: { name: string, type: string }[] = projectTypesConst;
  public currentType = 'all';
  public currentTypeName = 'Все';
  public isListVisible: boolean = null;

  @Output() setCurrentType = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  public toggleListOfTypes() {
    this.isListVisible = !this.isListVisible ? true : !this.isListVisible;
    // if (!this.isListVisible) {
    //   this.isListVisible = true;
    // } else {
    //   this.isListVisible = !this.isListVisible;
    // }
  }

  public setProjectType(type: string, name: string) {
    this.currentType = type;
    this.currentTypeName = name;
    this.setCurrentType.emit(this.currentType);
    this.isListVisible = false;
  }

  public hideMenu() {
    this.isListVisible = false;
  }

}
