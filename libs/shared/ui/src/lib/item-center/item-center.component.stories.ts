import type { Meta, StoryObj } from '@storybook/angular';
import { ItemCenterComponent } from './item-center.component';

const meta: Meta<ItemCenterComponent> = {
  component: ItemCenterComponent,
  title: 'ItemCenter',
};
export default meta;
type Story = StoryObj<ItemCenterComponent>;

export const Label: Story = {
  args: {
    label: 'Or continue with',
  },
};

export const Content: Story = {
  render: (args) => ({
    props: args,
    template: `<iv-item-center>Or continue with</iv-item-center>`,
  }),
};
