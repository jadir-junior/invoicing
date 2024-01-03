import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { ToolbarComponent } from './toolbar.component';
import { IvButtonComponent } from '../button/button.component';
import { AvatarComponent } from '../avatar/avatar.component';
import { RippleDirective } from '../ripple/ripple.directive';

const meta: Meta<ToolbarComponent> = {
  component: ToolbarComponent,
  title: 'Toolbar',
  decorators: [
    moduleMetadata({
      imports: [IvButtonComponent, AvatarComponent, RippleDirective],
    }),
  ],
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
          <a ivRipple style="cursor: pointer; margin-left: 0.5rem;">
            <iv-avatar shape="circle" image="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=740&t=st=1703971796~exp=1703972396~hmac=d723dc5eb266e594586d7b6d50e7d0156188ff92ac9076649f527b176a2457c7"></iv-avatar>
          </a>
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
