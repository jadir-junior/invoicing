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
  render: (args) => ({
    props: args,
    template: `
      <iv-toolbar>
        <div class="iv-toolbar-group-start">
          <iv-button label="dashboard" icon="dashboard" [text]="true"></iv-button>
          <iv-button label="custome" icon="support_agent" [text]="true"></iv-button>
          <iv-button label="calendar" icon="calendar_month" [text]="true"></iv-button>
          <iv-button label="stats" icon="query_stats" [text]="true"></iv-button>
        </div>
        <div class="iv-toolbar-group-end">
          <iv-button icon="inbox" [text]="true" [rounded]="true"></iv-button>
          <iv-button icon="notifications" [text]="true" [rounded]="true"></iv-button>
        </div>
      </iv-toolbar>
    `,
  }),
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
