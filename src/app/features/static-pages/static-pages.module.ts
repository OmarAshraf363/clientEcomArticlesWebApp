import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { HelpCenterComponent } from './components/help-center/help-center.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import {  StaticPagesRoutingModule } from './static-pages.routing.module';



@NgModule({
  declarations: [
    PrivacyPolicyComponent,
    HelpCenterComponent,
    AboutUsComponent
  ],
  imports: [
    CommonModule,
    StaticPagesRoutingModule

  ]
})
export class StaticPagesModule { }
 