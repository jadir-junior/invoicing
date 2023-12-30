import type { Meta, StoryObj } from '@storybook/angular';
import { AvatarComponent } from './avatar.component';

const meta: Meta<AvatarComponent> = {
  component: AvatarComponent,
  title: 'Avatar',
};
export default meta;
type Story = StoryObj<AvatarComponent>;

export const Label: Story = {
  args: {
    label: 'M',
    style: { 'background-color': 'blue', color: 'white' },
  },
};

export const Icon: Story = {
  args: {
    icon: 'person',
  },
};

export const Image: Story = {
  args: {
    image:
      'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=740&t=st=1703971796~exp=1703972396~hmac=d723dc5eb266e594586d7b6d50e7d0156188ff92ac9076649f527b176a2457c7',
  },
};

export const Sizes: Story = {
  args: {
    label: 'M',
    size: 'normal',
  },
  argTypes: {
    size: {
      options: ['normal', 'large', 'xlarge'],
      control: { type: 'radio' },
    },
  },
};

export const Shape: Story = {
  args: {
    label: 'M',
    shape: 'square',
  },
  argTypes: {
    shape: {
      options: ['square', 'circle'],
      control: { type: 'radio' },
    },
  },
};
