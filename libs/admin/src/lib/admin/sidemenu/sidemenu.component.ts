import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent, MenuItem } from '@invoicing/ui';

@Component({
  selector: 'invoicing-sidemenu',
  standalone: true,
  imports: [CommonModule, MenuComponent],
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
