import { render, screen } from '@testing-library/angular';
import { KeyFilterDirective } from './key-filter.directive';
import { InputTextDirective } from '../input-text/input-text.directive';
import userEvent from '@testing-library/user-event';

describe('KeyFilterDirective', () => {
  it('render input with ivKeyFilter with type int', async () => {
    await render(
      `<input ivInputText ivKeyFilter="int" aria-label="apples" />`,
      {
        imports: [InputTextDirective, KeyFilterDirective],
      }
    );
    const user = userEvent.setup();
    const input = screen.getByRole('textbox', { name: 'apples' });

    await user.type(input, '-12ab');

    expect(input).toHaveValue('-12');
  });

  it('render input with ivKeyFilter with type money', async () => {
    await render(
      `<input ivInputText ivKeyFilter="money" aria-label="apples" />`,
      {
        imports: [InputTextDirective, KeyFilterDirective],
      }
    );
    const user = userEvent.setup();
    const input = screen.getByRole('textbox', { name: 'apples' });

    await user.type(input, '-12ab.35');

    expect(input).toHaveValue('12.35');
  });

  it('render input with ivKeyFilter with type num', async () => {
    await render(
      `<input ivInputText ivKeyFilter="num" aria-label="apples" />`,
      {
        imports: [InputTextDirective, KeyFilterDirective],
      }
    );
    const user = userEvent.setup();
    const input = screen.getByRole('textbox', { name: 'apples' });

    await user.type(input, '-12ab.35');

    expect(input).toHaveValue('-12.35');
  });

  it('render input with ivKeyFilter with type num and press Enter, when press Enter do nothing', async () => {
    await render(
      `<input ivInputText ivKeyFilter="num" aria-label="apples" />`,
      {
        imports: [InputTextDirective, KeyFilterDirective],
      }
    );
    const user = userEvent.setup();
    const input = screen.getByRole('textbox', { name: 'apples' });

    await user.keyboard('{Enter}');
    await user.type(input, '-12ab.35');

    expect(input).toHaveValue('-12.35');
  });
});
