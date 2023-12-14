import { render, screen } from '@testing-library/angular';
import { IvButtonComponent } from '../button/button.component';
import { MenuComponent } from './menu.component';
import userEvent from '@testing-library/user-event';

describe('MenuComponent', () => {
  const user = userEvent.setup();

  const setupPopup = async () => {
    return await render(
      `
      <iv-button type="button" label="show" (onClick)="menu.toggle($event)"></iv-button>
      <iv-menu #menu [popup]="true" [model]="[{label: 'Update', icon: 'icon'}, {label: 'Delete', icon: 'delete'}]"></iv-menu>
    `,
      {
        imports: [IvButtonComponent, MenuComponent],
      }
    );
  };

  it('show the menu', async () => {
    await setupPopup();

    await user.click(screen.getByRole('button', { name: 'show' }));

    expect(screen.getByLabelText('Update')).toBeInTheDocument();
    expect(screen.getByLabelText('Delete')).toBeInTheDocument();
  });

  it.skip('close when click menu item', async () => {
    await setupPopup();

    await user.click(screen.getByRole('button', { name: 'show' }));

    const menuItemUpdate = screen.getByLabelText('Update');

    expect(menuItemUpdate).toBeInTheDocument();
    expect(screen.getByLabelText('Delete')).toBeInTheDocument();

    await user.click(menuItemUpdate);

    expect(screen.queryByLabelText('Update')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Delete')).not.toBeInTheDocument();
  });
});
