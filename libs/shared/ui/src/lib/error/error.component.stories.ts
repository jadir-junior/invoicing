import type { Meta, StoryObj } from '@storybook/angular';
import { ErrorComponent } from './error.component';

const meta: Meta<ErrorComponent> = {
  component: ErrorComponent,
  title: 'Error',
};
export default meta;
type Story = StoryObj<ErrorComponent>;

export const Basic: Story = {
  render: (args) => ({
    props: args,
    template: `<iv-error>this is a error</iv-error>`,
  }),
};
