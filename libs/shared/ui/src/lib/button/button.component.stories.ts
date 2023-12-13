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

export const Content: Story = {
  render: (args) => ({
    props: args,
    template: `
      <iv-button type="submit">Submit</iv-button>
    `,
  }),
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

export const Block: Story = {
  args: {
    label: 'Submit',
    block: true,
  },
};

export const Rounded: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; gap: 0.5rem;">
        <iv-button [rounded]="true">Submit</iv-button>
        <iv-button icon="menu" [rounded]="true"></iv-button>
      </div>
    `,
  }),
};

export const Text: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; gap: 0.5rem;">
        <iv-button label="Primary" [text]="true"></iv-button>
        <iv-button label="Secondary" severity="secondary" [text]="true"></iv-button>
      </div>
    `,
  }),
};
