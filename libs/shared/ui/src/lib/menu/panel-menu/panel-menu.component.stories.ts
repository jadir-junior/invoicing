import {
  moduleMetadata,
  type Meta,
  type StoryObj,
  applicationConfig,
} from '@storybook/angular';
import { PanelMenuComponent } from './panel-menu.component';
import { RippleDirective } from '../../ripple/ripple.directive';
import { provideAnimations } from '@angular/platform-browser/animations';
import { forwardRef } from '@angular/core';

const meta: Meta<PanelMenuComponent> = {
  component: PanelMenuComponent,
  title: 'PanelMenu',
  decorators: [
    moduleMetadata({
      imports: [RippleDirective, forwardRef(() => PanelMenuComponent)],
    }),
    applicationConfig({ providers: [provideAnimations()] }),
  ],
};
export default meta;
type Story = StoryObj<PanelMenuComponent>;

export const Basic: Story = {
  args: {
    model: [
      {
        label: 'Processar Pré-Fatura',
        icon: 'receipt_long',
      },
    ],
  },
};
