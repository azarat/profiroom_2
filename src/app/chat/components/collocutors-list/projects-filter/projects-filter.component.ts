import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { projectTypesConst } from './consts/projects';

@Component({
  selector: 'app-projects-filter',
  templateUrl: './projects-filter.component.html',
  styleUrls: ['./projects-filter.component.scss']
})
export class ProjectsFilterComponent implements OnInit {

  public projectTypes: { name: string, type: string }[] = projectTypesConst;
  public currentType = 'all';
  public currentTypeName = 'chat.work_chat.deal-filter.all';
  public isListVisible: boolean = null;

  @Output() setCurrentType = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  public toggleListOfTypes() {
    this.isListVisible = !this.isListVisible ? true : !this.isListVisible;

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
