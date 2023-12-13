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
    expect(button).not.toHaveClass('iv-button-icon-only');
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

  it('render basic button with severity success', async () => {
    await render(IvButtonComponent, {
      componentProperties: {
        severity: 'success',
        label: 'Submit',
      },
    });

    const button = screen.getByRole('button', { name: 'Submit' });

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('iv-button-success');
  });

  it('render basic button with severity info', async () => {
    await render(IvButtonComponent, {
      componentProperties: {
        severity: 'info',
        label: 'Submit',
      },
    });

    const button = screen.getByRole('button', { name: 'Submit' });

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('iv-button-info');
  });

  it('render basic button with severity warning', async () => {
    await render(IvButtonComponent, {
      componentProperties: {
        severity: 'warning',
        label: 'Submit',
      },
    });

    const button = screen.getByRole('button', { name: 'Submit' });

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('iv-button-warning');
  });

  it('render basic button with severity help', async () => {
    await render(IvButtonComponent, {
      componentProperties: {
        severity: 'help',
        label: 'Submit',
      },
    });

    const button = screen.getByRole('button', { name: 'Submit' });

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('iv-button-help');
  });

  it('render basic button with severity danger', async () => {
    await render(IvButtonComponent, {
      componentProperties: {
        severity: 'danger',
        label: 'Submit',
      },
    });

    const button = screen.getByRole('button', { name: 'Submit' });

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('iv-button-danger');
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

  it('render button as a link', async () => {
    await render(IvButtonComponent, {
      componentProperties: {
        label: 'Submit',
        link: true,
      },
    });

    const button = screen.getByRole('button', { name: 'Submit' });

    expect(button).toHaveClass('iv-button-link');
  });

  it('render a icon button only', async () => {
    await render(IvButtonComponent, {
      componentProperties: {
        icon: 'done',
      },
    });

    expect(screen.getByRole('button')).toHaveClass('iv-button-icon-only');
  });

  it('render a button with icon left', async () => {
    await render(IvButtonComponent, {
      componentProperties: {
        icon: 'done',
        label: 'Submit',
      },
    });

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByLabelText('iv-button-icon')).toHaveClass(
      'iv-button-icon-left'
    );
  });

  it('render a button with icon right', async () => {
    await render(IvButtonComponent, {
      componentProperties: {
        icon: 'done',
        label: 'Submit',
        iconPosition: 'right',
      },
    });

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByLabelText('iv-button-icon')).toHaveClass(
      'iv-button-icon-right'
    );
  });

  it('render a button with block property', async () => {
    await render(IvButtonComponent, {
      componentProperties: {
        label: 'Submit',
        block: true,
      },
    });

    expect(screen.getByRole('button')).toHaveClass('iv-button-block');
  });

  it('render a button with rounded', async () => {
    await render(IvButtonComponent, {
      componentProperties: {
        label: 'Submit',
        rounded: true,
      },
    });

    expect(screen.getByRole('button')).toHaveClass('iv-button-rounded');
    expect(screen.getByRole('button')).not.toHaveClass('iv-button-icon-only');
  });

  it('render a button with rounded and icon only', async () => {
    await render(IvButtonComponent, {
      componentProperties: {
        icon: 'menu',
        rounded: true,
      },
    });

    expect(screen.getByRole('button')).toHaveClass('iv-button-rounded');
    expect(screen.getByRole('button')).toHaveClass('iv-button-icon-only');
  });

  it('render a button with a text prop', async () => {
    await render(IvButtonComponent, {
      componentProperties: {
        icon: 'menu',
        text: true,
      },
    });

    expect(screen.getByRole('button')).toHaveClass('iv-button-text');
  });
});
