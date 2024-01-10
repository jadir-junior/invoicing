import {
  moduleMetadata,
  type Meta,
  type StoryObj,
  applicationConfig,
  argsToTemplate,
} from '@storybook/angular';
import { PanelMenuComponent } from './panel-menu.component';
import { RippleDirective } from '../../ripple/ripple.directive';
import { provideAnimations } from '@angular/platform-browser/animations';
import { forwardRef } from '@angular/core';
import { MenuItem } from '../menu-item.model';

const model: MenuItem[] = [
  {
    label: 'File',
    icon: 'description',
    expanded: true,
    items: [
      {
        label: 'New',
        icon: 'add',
        items: [
          {
            label: 'Bookmark',
            icon: 'bookmark',
          },
          {
            label: 'Video',
            icon: 'videocam',
          },
        ],
      },
      {
        label: 'Delete',
        icon: 'delete',
      },
      {
        label: 'Export',
        icon: 'ios_share',
      },
    ],
  },
  {
    label: 'Edit',
    icon: 'edit',
    items: [
      {
        label: 'Left',
        icon: 'format_align_left',
      },
      {
        label: 'Right',
        icon: 'format_align_right',
      },
      {
        label: 'Center',
        icon: 'format_align_center',
      },
      { label: 'Justify', icon: 'format_align_justify' },
    ],
  },
  {
    label: 'User',
    icon: 'person',
    items: [
      {
        label: 'New',
        icon: 'person_add',
      },
      {
        label: 'Delete',
        icon: 'person_remove',
      },
      {
        label: 'Search',
        icon: 'group',
        items: [
          {
            label: 'Filter',
            icon: 'filter_alt',
            items: [{ label: 'Print', icon: 'print' }],
          },
          {
            label: 'List',
            icon: 'reorder',
          },
        ],
      },
    ],
  },
  {
    label: 'Events',
    icon: 'event',
    items: [
      {
        label: 'Edit',
        icon: 'edit',
        items: [
          { label: 'Save', icon: 'add' },
          { label: 'Delete', icon: 'delete' },
        ],
      },
      {
        label: 'Archieve',
        icon: 'event_busy',
        items: [{ label: 'Remove', icon: 'delete' }],
      },
    ],
  },
];

const meta: Meta<PanelMenuComponent> = {
  component: PanelMenuComponent,
  title: 'PanelMenu',
  decorators: [
    moduleMetadata({
      imports: [RippleDirective, forwardRef(() => PanelMenuComponent)],
    }),
    applicationConfig({ providers: [provideAnimations()] }),
  ],
};
export default meta;
type Story = StoryObj<PanelMenuComponent>;

export const Basic: Story = {
  args: {
    model: model,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="width: 300px;">
        <iv-panel-menu ${argsToTemplate(args)}></iv-panel-menu>
      </div>
    `,
  }),
};
