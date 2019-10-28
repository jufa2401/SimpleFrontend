import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AuthGuardService as AuthGuard} from './auth/auth-guard.service';
import { LandingpageComponent } from './shared/landingpage/landingpage.component';


const appRoutes: Routes = [
  {path: 'home',
    component: LandingpageComponent,
    canActivate: [AuthGuard]},
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
    ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

