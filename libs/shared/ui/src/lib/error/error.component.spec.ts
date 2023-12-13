import { ErrorComponent } from './error.component';
import { render, screen } from '@testing-library/angular';

describe('ErrorComponent', () => {
  it('create a iv-error component', async () => {
    await render(`<iv-error>this is a error</iv-error>`, {
      imports: [ErrorComponent],
    });

    expect(screen.getByText('this is a error')).toBeInTheDocument();
  });
});
