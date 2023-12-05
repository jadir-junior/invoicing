import type { Meta, StoryObj } from '@storybook/angular';
import { IvButtonComponent } from './button.component';

const meta: Meta<IvButtonComponent> = {
  component: IvButtonComponent,
  title: 'Button',
};
export default meta;
type Story = StoryObj<IvButtonComponent>;

export const Basic: Story = {
  args: {
    label: 'Submit',
  },
  argTypes: {
    severity: {
      options: ['primary', 'secondary'],
      control: { type: 'radio' },
    },
  },
};
