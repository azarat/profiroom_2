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
  user: UserModel;
  menuOpen: boolean = null;


  constructor(
    private userService: UserService,
    private authService: AuthentificationService,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit() {
    this.userService.getDashboardRes()
      .subscribe((res: any) => {
        console.log(res);
        this.user = plainToClass(UserModel, res[0]);
      });
  }

  toggleMenu() {
    if(this.menuOpen === null) {
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

}
