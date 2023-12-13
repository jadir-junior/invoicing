import type { Meta, StoryObj } from '@storybook/angular';
import { SignInWithMicrosoftComponent } from './sign-in-with-microsoft.component';

const meta: Meta<SignInWithMicrosoftComponent> = {
  component: SignInWithMicrosoftComponent,
  title: 'SignInWithMicrosoft',
};
export default meta;
type Story = StoryObj<SignInWithMicrosoftComponent>;

export const Basic: Story = {
  args: {},
};
