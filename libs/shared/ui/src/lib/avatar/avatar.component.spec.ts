import { AvatarComponent } from './avatar.component';
import { render, screen } from '@testing-library/angular';

describe('Avatar Component', () => {
  it('render a avatar with a label', async () => {
    await render(AvatarComponent, {
      componentProperties: {
        label: 'M',
        ariaLabel: 'avatar',
      },
    });

    expect(screen.getByLabelText('avatar')).toHaveClass(
      'iv-avatar',
      'iv-avatar-normal'
    );
  });
});
