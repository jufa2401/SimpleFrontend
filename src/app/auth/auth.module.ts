import {NgModule} from '@angular/core';
import {LoginComponent} from './login/login.component';
import {FormsModule} from '@angular/forms';
import {AuthRoutingModule} from './auth-routing.module';
import {SharedModule} from '../shared/shared.module';
import {AuthService} from './auth.service';
import {AuthGuardService} from './auth-guard.service';
import {HeaderComponent} from './header/header.component';
import {ModalModule} from 'ngx-bootstrap';

@NgModule({
  declarations: [LoginComponent, HeaderComponent],
  imports: [FormsModule, AuthRoutingModule, SharedModule, ModalModule.forRoot()],
  exports: [HeaderComponent],
  providers: [AuthService, AuthGuardService]
})
export class AuthModule {}
