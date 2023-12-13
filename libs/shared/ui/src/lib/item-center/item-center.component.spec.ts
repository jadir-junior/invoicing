import { ItemCenterComponent } from './item-center.component';
import { render, screen } from '@testing-library/angular';

describe('ItemCenterComponent', () => {
  it('create a component with label', async () => {
    await render(ItemCenterComponent, {
      componentProperties: {
        label: 'Or continue with',
      },
    });

    expect(screen.getByText('Or continue with')).toBeInTheDocument();
  });

  it('create item center with content', async () => {
    await render(`<iv-item-center>Or continue with</iv-item-center>`, {
      imports: [ItemCenterComponent],
    });

    expect(screen.getByText('Or continue with')).toBeInTheDocument();
  });
});
