import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
// footer.component.ts
links: any[] = [
  { name: 'Privacy Policy', url: '/my/privacy-policy' },
  { name: 'Terms of Service', url: '/my/terms-of-service' },
  { name: 'Contact Us', url: '/my/contact-us' },
  { name: 'About Us', url: '/my/about-us' },
  { name: 'Help Center', url: '/my/help-center' }
];

}
