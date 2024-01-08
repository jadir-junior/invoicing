import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IvButtonComponent,
  IvTemplate,
  MenuComponent,
  MenuItem,
  ToolbarComponent,
} from '@invoicing/ui';
import { MsalService } from '@azure/msal-angular';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'invoicing-admin',
  standalone: true,
  imports: [
    CommonModule,
    ToolbarComponent,
    IvButtonComponent,
    MenuComponent,
    IvTemplate,
    SidemenuComponent,
    RouterModule,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent {
  authService = inject(MsalService);

  accountMenu: MenuItem[] = [
    {
      label: 'Profile',
      icon: 'account_circle',
    },
    {
      label: 'Settings',
      icon: 'settings',
    },
    {
      separator: true,
    },
    {
      label: 'Sign out',
      icon: 'logout',
      command: () => {
        this.logout();
      },
    },
  ];

  logout(): void {
    this.authService.logoutRedirect();
  }
}
