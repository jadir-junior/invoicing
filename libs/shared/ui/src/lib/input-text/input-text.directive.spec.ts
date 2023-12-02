import { getNgForm } from './../utils/testing-helper/testing-helper';
import { render, screen } from '@testing-library/angular';
import { InputTextDirective } from './input-text.directive';
import { FormsModule } from '@angular/forms';
import userEvent from '@testing-library/user-event';

describe('InputTextDirective', () => {
  it('create a input with ngModel', async () => {
    const user = userEvent.setup();

    const component = await render(
      `<form>
    <input ivInputText [(ngModel)]="name" name="name" id="name" type="text" aria-label="name" />
  </form>`,
      {
        imports: [InputTextDirective, FormsModule],
      }
    );

    const model = getNgForm(component);

    expect(model.name).toBe(undefined);

    await user.type(screen.getByRole('textbox', { name: 'name' }), 'Mick');

    expect(model.value.name).toBe('Mick');
  });

  it('create a input with size small', async () => {
    await render(
      `<form>
    <input ivInputText [(ngModel)]="name" name="name" id="name" type="text" aria-label="name" size="small" />
  </form>`,
      {
        imports: [InputTextDirective, FormsModule],
      }
    );

    expect(screen.getByRole('textbox', { name: 'name' })).toHaveClass(
      'iv-input-text',
      'iv-input-text-size-small'
    );
  });

  it('create a input with size normal', async () => {
    await render(
      `<form>
    <input ivInputText [(ngModel)]="name" name="name" id="name" type="text" aria-label="name" />
  </form>`,
      {
        imports: [InputTextDirective, FormsModule],
      }
    );

    expect(screen.getByRole('textbox', { name: 'name' })).toHaveClass(
      'iv-input-text'
    );
  });

  it('create a input with size large', async () => {
    await render(
      `<form>
    <input ivInputText [(ngModel)]="name" name="name" id="name" type="text" aria-label="name" size="large" />
  </form>`,
      {
        imports: [InputTextDirective, FormsModule],
      }
    );

    expect(screen.getByRole('textbox', { name: 'name' })).toHaveClass(
      'iv-input-text',
      'iv-input-text-size-large'
    );
  });
});
