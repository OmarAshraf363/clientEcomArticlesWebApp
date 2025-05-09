import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PrivacyPolicyComponent } from "./components/privacy-policy/privacy-policy.component";
import { AboutUsComponent } from "./components/about-us/about-us.component";
import { HelpCenterComponent } from "./components/help-center/help-center.component";
import { ContactUsComponent } from "./components/contact-us/contact-us.component";
import { TermOfServiceComponent } from "./components/term-of-service/term-of-service.component";
const routes: Routes = [
    { path: 'privacy-policy', component: PrivacyPolicyComponent },
    { path: 'about-us', component: AboutUsComponent },
    { path: 'help-center', component: HelpCenterComponent },
    { path: 'contact-us', component: ContactUsComponent },
{ path: 'terms-of-service', component: TermOfServiceComponent },
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class StaticPagesRoutingModule {}
  