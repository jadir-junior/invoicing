import { IvTemplate } from '@invoicing/iv-template';
import { CardComponent } from './card.component';
import { render, screen } from '@testing-library/angular';

describe('CardComponent', () => {
  it('render the header of card', async () => {
    await render(
      `<iv-card>
      <ng-template ivTemplate="header">
        <p>Header</p>
      </ng-template>
    </iv-card>`,
      {
        imports: [CardComponent, IvTemplate],
      }
    );

    expect(screen.getByText('Header')).toBeInTheDocument();
  });
});
