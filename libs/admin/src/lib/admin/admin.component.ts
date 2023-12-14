import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IvButtonComponent, ToolbarComponent } from '@invoicing/ui';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'invoicing-admin',
  standalone: true,
  imports: [CommonModule, ToolbarComponent, IvButtonComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent {
  authService = inject(MsalService);

  logout(): void {
    this.authService.logoutRedirect();
  }
}
