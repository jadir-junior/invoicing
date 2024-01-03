import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent, MenuItem, PanelMenuComponent } from '@invoicing/ui';

@Component({
  selector: 'invoicing-sidemenu',
  standalone: true,
  imports: [CommonModule, MenuComponent, PanelMenuComponent],
  templateUrl: './sidemenu.component.html',
  styleUrl: './sidemenu.component.css',
})
export class SidemenuComponent {
  model: MenuItem[] = [
    {
      label: 'Processar Pré-Fatura',
      icon: 'receipt_long',
      items: [
        {
          label: 'Frete',
          icon: 'local_shipping',
          items: [
            {
              label: 'Aprovar Dados Diários',
              icon: 'calendar_month',
            },
            {
              label: 'Gerar Pré-Fatura',
              icon: 'auto_stories',
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
}
