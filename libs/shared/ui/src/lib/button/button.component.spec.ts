/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from '@testing-library/angular';
import { IvButtonComponent } from './button.component';
import userEvent from '@testing-library/user-event';

describe('IvButtonComponent', () => {
  it('render a basic button with a label', async () => {
    await render(IvButtonComponent, {
      componentProperties: {
        label: 'Submit',
      },
    });

    const button = screen.getByRole('button', { name: 'Submit' });

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('iv-button');
  });

  it('render basic button with content', async () => {
    await render(`<iv-button>Submit</iv-button>`, {
      imports: [IvButtonComponent],
    });

    const button = screen.getByRole('button', { name: 'Submit' });

    expect(button).toBeInTheDocument();
  });

  it('render basic button with severity primary', async () => {
    await render(IvButtonComponent, {
      componentProperties: {
        severity: 'primary',
        label: 'Submit',
      },
    });

    const button = screen.getByRole('button', { name: 'Submit' });

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('iv-button-primary');
  });

  it('render basic button with severity secondary', async () => {
    await render(IvButtonComponent, {
      componentProperties: {
        severity: 'secondary',
        label: 'Submit',
      },
    });

    const button = screen.getByRole('button', { name: 'Submit' });

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('iv-button-secondary');
  });

  it('render basic button and emit event in output onClick', async () => {
    const click = jest.fn();
    const user = userEvent.setup();

    await render(IvButtonComponent, {
      componentProperties: {
        severity: 'secondary',
        label: 'Submit',
      },
      componentOutputs: {
        onClick: {
          emit: click,
        } as any,
      },
    });

    const button = screen.getByRole('button', { name: 'Submit' });
    await user.click(button);

    expect(button).toBeInTheDocument();
    expect(click).toHaveBeenCalled();
  });
});
