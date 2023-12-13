import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { ToolbarComponent } from './toolbar.component';
import { IvButtonComponent } from '../button/button.component';

const meta: Meta<ToolbarComponent> = {
  component: ToolbarComponent,
  title: 'Toolbar',
  decorators: [moduleMetadata({ imports: [IvButtonComponent] })],
};
export default meta;
type Story = StoryObj<ToolbarComponent>;

export const Basic: Story = {
  args: {},
};

export const Content: Story = {
  render: (args) => ({
    props: args,
    template: `
      <iv-toolbar>
        <iv-button icon="menu" [text]="true" [rounded]="true"></iv-button>
      </iv-toolbar>
    `,
  }),
};
