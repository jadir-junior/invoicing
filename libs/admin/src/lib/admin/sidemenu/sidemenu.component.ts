import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent, MenuItem, PanelMenuComponent } from '@invoicing/ui';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'invoicing-sidemenu',
  standalone: true,
  imports: [CommonModule, MenuComponent, PanelMenuComponent, RouterModule],
  template: `<iv-panel-menu [model]="model"></iv-panel-menu>`,
})
export class SidemenuComponent {
  model: MenuItem[] = [
    {
      label: 'Processar Pré-Fatura',
      icon: 'receipt_long',
      expanded: this.isRouteExpanded('/process-pre-invoice'),
      items: [
        {
          label: 'Frete',
          icon: 'local_shipping',
          expanded: this.isRouteExpanded('/shipping'),
          items: [
            {
              label: 'Aprovar Dados Diários',
              icon: 'calendar_month',
              routerLink: '/process-pre-invoice/shipping/daily-data',
            },
            {
              label: 'Gerar Pré-Fatura',
              icon: 'auto_stories',
              routerLink: '/process-pre-invoice/shipping/generate-pre-invoice',
            },
            {
              label: 'Consultar Dados',
              icon: 'query_stats',
            },
            {
              label: 'Resumo e Detalhe',
              icon: 'paid',
            },
          ],
        },
        {
          label: 'Operações Florestais',
          icon: 'forest',
        },
      ],
    },
    {
      label: 'Tabela de Tarifas',
      icon: 'percent',
    },
    {
      label: 'Configurações',
      icon: 'settings',
    },
  ];

  constructor(private router: Router) {}

  isRouteExpanded(route: string): boolean {
    if (this.router.url.includes(route)) {
      return true;
    }
    return false;
  }
}
