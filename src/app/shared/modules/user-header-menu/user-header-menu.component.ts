import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { UserModel } from 'src/app/models/user.model';
import { plainToClass } from 'class-transformer';
import { AuthentificationService } from 'src/app/core/services/auth.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';

@Component({
  selector: 'app-user-header-menu',
  templateUrl: './user-header-menu.component.html',
  styleUrls: ['./user-header-menu.component.scss']
})
export class UserHeaderMenuComponent implements OnInit {

  @Input() userId: string | number;
  @Output() userIdChange = new EventEmitter<any>();
  public user: UserModel = null;
  public menuOpen: boolean = null;
  public isUserFreelancer: boolean;


  constructor(
    private userService: UserService,
    private authService: AuthentificationService,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit() {
    this.userService.getMinUserData()
      .subscribe((res: any) => {
        this.user = plainToClass(UserModel, res);
        this._checkUserState();
      });

  }

  toggleMenu() {
    if (this.menuOpen === null) {
      this.menuOpen = true;
    } else {
      this.menuOpen = !this.menuOpen;
    }
  }

  logOut() {
    this.localStorageService.removeItem('token');
    this.localStorageService.setItem('userId', null);
    this.userIdChange.emit(null);
  }


  private _checkUserState() {
    this.user.role_id === 1 ? this.isUserFreelancer = true : this.isUserFreelancer = null;
  }

}
