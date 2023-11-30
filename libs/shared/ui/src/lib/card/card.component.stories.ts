import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { CardComponent } from './card.component';

import { IvTemplate } from '../template/iv-template.directive';

const meta: Meta<CardComponent> = {
  component: CardComponent,
  title: 'Card',
  decorators: [moduleMetadata({ imports: [IvTemplate] })],
};
export default meta;
type Story = StoryObj<CardComponent>;

export const Basic: Story = {
  render: (args) => ({
    props: args,
    template: `
      <iv-card title="Title">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!</p>
      </iv-card>
    `,
  }),
};

export const Advanced: Story = {
  render: (args) => ({
    props: args,
    template: `
      <iv-card title="Advanced Card" subtitle="Card subtitle" [style]="{width: '360px'}">
        <ng-template ivTemplate="header">
          <img alt="Card" src="https://primefaces.org/cdn/primeng/images/usercard.png" style="width: 100%;" />
        </ng-template>
        <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque
        quas!
        </p>
        <ng-template ivTemplate="footer">
          <button>Save</button>
          <button>Cancel</button>
        </ng-template>
      </iv-card>
    `,
  }),
};
