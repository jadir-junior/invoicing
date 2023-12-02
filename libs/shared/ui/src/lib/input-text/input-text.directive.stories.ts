import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { InputTextDirective, Size } from './input-text.directive';
import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { AbstractControl, FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'iv-wrapper-component',
  template: `<form>
    <div
      [style]="
        icon ? '' : 'display: flex; flex-direction: column; gap: 0.5rem;'
      "
    >
      @if(label) {
      <label for="username">Username</label>
      } @if(icon) {
      <span
        [ngClass]="
          iconPosition === 'left' ? 'iv-input-icon-left' : 'iv-input-icon-right'
        "
      >
        <i class="material-icons-outlined">search</i>
        <input
          #ipt="ngModel"
          ivInputText
          type="text"
          [required]="invalid"
          [(ngModel)]="username"
          [disabled]="disabled"
          name="username"
          id="username"
          aria-describedby="username-help"
          [size]="size"
        />
      </span>
      } @else {
      <input
        #ipt="ngModel"
        ivInputText
        type="text"
        [required]="invalid"
        [(ngModel)]="username"
        [disabled]="disabled"
        name="username"
        id="username"
        aria-describedby="username-help"
        [size]="size"
      />
      } @if(helpText) {
      <small id="username-help">
        Enter your username to reset your password
      </small>
      }
    </div>
  </form>`,
  imports: [FormsModule],
  providers: [NgModel],
})
class WrapperComponent implements AfterViewInit {
  username = '';

  @ViewChild('ipt') ipt!: NgModel;

  @Input() invalid = false;
  @Input() disabled = false;
  @Input() label = false;
  @Input() helpText = false;
  @Input() size: Size = 'normal';
  @Input() icon = false;
  @Input() iconPosition: 'left' | 'right' = 'left';

  ngAfterViewInit(): void {
    if (this.invalid) {
      const value: AbstractControl | null = this.ipt.control;
      if (value) {
        value.markAsDirty();
        value.markAsTouched();
      }
    }
  }
}

const meta: Meta<WrapperComponent> = {
  component: WrapperComponent,
  title: 'Input text',
  decorators: [moduleMetadata({ imports: [InputTextDirective, FormsModule] })],
};
export default meta;
type Story = StoryObj<WrapperComponent>;

export const Basic: Story = {
  args: {},
};

export const Invalid: Story = {
  args: {
    invalid: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const HelpText: Story = {
  args: {
    label: true,
    helpText: true,
  },
};

export const Sizes: Story = {
  argTypes: {
    size: {
      options: ['small', 'normal', 'large'],
      control: { type: 'radio' },
    },
  },
};

export const Icons: Story = {
  args: {
    icon: true,
  },
  argTypes: {
    iconPosition: { options: ['left', 'right'], control: { type: 'radio' } },
  },
};
