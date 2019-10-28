import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {NgxLoadingModule} from 'ngx-loading';
import { LandingpageComponent } from './landingpage/landingpage.component';


@NgModule({
  imports: [
    NgxLoadingModule.forRoot({}),
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({ // ToastrModule added
    timeOut: 2000
  })],
  exports: [NgxLoadingModule, CommonModule],
  declarations: [LandingpageComponent],
})
export class SharedModule {}
