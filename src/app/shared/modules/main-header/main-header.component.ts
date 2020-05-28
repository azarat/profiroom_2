import { Component, OnInit, Input } from '@angular/core';
import { LocalizeRouterService } from 'localize-router';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { UserService } from 'src/app/core/services/user.service';
import { plainToClass } from 'class-transformer';
import { UserModel } from 'src/app/models/user.model';
import { AuthentificationService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss']
})
export class MainHeaderComponent implements OnInit {

  @Input() pageName: string;
  public token: any;
  public currentUser: UserModel;
  public routeMainPage: any = this.localize.translateRoute('');
  public hamburgerMenu = false;
  public langList = false;

  constructor(
    private localize: LocalizeRouterService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private authService: AuthentificationService
  ) {
    this.checkUserToken();
  }

  ngOnInit() { }

  routeToMain() {
    this.router.navigate([this.routeMainPage]);
  }

  checkUserToken() {
    this.token = this.localStorageService.getItem('token').value;
  }

  public toggleHamburgerMenu(){
    this.hamburgerMenu = !this.hamburgerMenu;
  }

  public showLangList() {
    this.langList = !this.langList;
  }
  public userExited() {
    this.token = null;
  }
}
