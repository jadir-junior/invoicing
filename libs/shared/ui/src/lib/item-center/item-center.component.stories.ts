import type { Meta, StoryObj } from '@storybook/angular';
import { ItemCenterComponent } from './item-center.component';

const meta: Meta<ItemCenterComponent> = {
  component: ItemCenterComponent,
  title: 'ItemCenter',
};
export default meta;
type Story = StoryObj<ItemCenterComponent>;

export const Basic: Story = {
  args: {},
};
