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

  it('render the title in body', async () => {
    await render(
      `<iv-card>
      <ng-template ivTemplate="title">
        <p>Title</p>
      </ng-template>
    </iv-card>`,
      {
        imports: [CardComponent, IvTemplate],
      }
    );

    expect(screen.getByText('Title')).toBeInTheDocument();
  });

  it('render the content without ivTemplate', async () => {
    await render(
      `<iv-card>
        <p>content</p>
    </iv-card>`,
      {
        imports: [CardComponent, IvTemplate],
      }
    );

    expect(screen.getByText('content')).toBeInTheDocument();
  });

  it('render the content', async () => {
    await render(
      `<iv-card>
      <ng-template ivTemplate="content">
        <p>content</p>
      </ng-template>
    </iv-card>`,
      {
        imports: [CardComponent, IvTemplate],
      }
    );

    expect(screen.getByText('content')).toBeInTheDocument();
  });

  it('render the footer', async () => {
    await render(
      `<iv-card>
      <ng-template ivTemplate="footer">
        <p>footer</p>
      </ng-template>
    </iv-card>`,
      {
        imports: [CardComponent, IvTemplate],
      }
    );

    expect(screen.getByText('footer')).toBeInTheDocument();
  });
});
