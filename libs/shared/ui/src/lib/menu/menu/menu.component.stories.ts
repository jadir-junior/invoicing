import {
  moduleMetadata,
  type Meta,
  type StoryObj,
  applicationConfig,
} from '@storybook/angular';
import { MenuComponent } from './menu.component';
import { IvButtonComponent } from '../button/button.component';
import { provideAnimations } from '@angular/platform-browser/animations';

const meta: Meta<MenuComponent> = {
  component: MenuComponent,
  title: 'Menu',
  decorators: [
    moduleMetadata({ imports: [IvButtonComponent] }),
    applicationConfig({ providers: [provideAnimations()] }),
  ],
};
export default meta;
type Story = StoryObj<MenuComponent>;

export const Basic: Story = {
  args: {
    model: [
      {
        label: 'New',
        icon: 'add',
      },
      {
        label: 'Delete',
        icon: 'delete',
      },
    ],
  },
};

export const Popup: Story = {
  args: {
    model: [
      {
        label: 'Update',
        icon: 'update',
      },
      {
        label: 'Delete',
        icon: 'delete',
      },
    ],
  },
  render: (args) => ({
    props: args,
    template: `
      <iv-menu #menu [popup]="true" [model]="model"></iv-menu>
      <iv-button type="button" (onClick)="menu.toggle($event)" icon="menu"></iv-button>
    `,
  }),
};
