import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProcessPreInvoiceComponent } from './process-pre-invoice.component';

describe('ProcessPreInvoiceComponent', () => {
  let component: ProcessPreInvoiceComponent;
  let fixture: ComponentFixture<ProcessPreInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcessPreInvoiceComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProcessPreInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
