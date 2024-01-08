import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GeneratePreInvoiceComponent } from './generate-pre-invoice.component';

describe('GeneratePreInvoiceComponent', () => {
  let component: GeneratePreInvoiceComponent;
  let fixture: ComponentFixture<GeneratePreInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneratePreInvoiceComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GeneratePreInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
