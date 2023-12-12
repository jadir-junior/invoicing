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
    link: false,
  },
};

export const Link: Story = {
  args: {
    label: 'Submit',
    link: true,
  },
  argTypes: {
    link: {
      options: [true, false],
      control: { type: 'radio' },
    },
  },
};

export const Icons: Story = {
  args: {
    label: 'Submit',
    icon: 'done',
    iconPosition: 'left',
  },
  argTypes: {
    iconPosition: {
      options: ['left', 'right'],
      control: { type: 'radio' },
    },
  },
};

export const IconOnly: Story = {
  args: {
    icon: 'done',
  },
};

export const Severity: Story = {
  args: {
    label: 'Submit',
    link: false,
    severity: 'primary',
  },
  argTypes: {
    severity: {
      options: [
        'primary',
        'secondary',
        'success',
        'info',
        'warning',
        'help',
        'danger',
      ],
      control: { type: 'radio' },
    },
  },
};
