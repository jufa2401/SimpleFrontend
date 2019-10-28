import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {

  constructor (private authService: AuthService, private router: Router) {  }
  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // this.authService.validate();
    return this.authService.isAuthenticated().then(
      (authenticated: boolean) => {
        if (authenticated && !this.authService.sessionExpired) {
          this.authService.loggedIn = true;
          // console.log(authenticated);
          return true;
        } else {
          this.authService.loggedIn = false;
          this.router.navigate(['./']);
        }
      }
    );
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(childRoute, state);
  }

}
