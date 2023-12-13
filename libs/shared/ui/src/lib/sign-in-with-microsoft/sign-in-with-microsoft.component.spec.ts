import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignInWithMicrosoftComponent } from './sign-in-with-microsoft.component';

describe('SignInWithMicrosoftComponent', () => {
  let component: SignInWithMicrosoftComponent;
  let fixture: ComponentFixture<SignInWithMicrosoftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignInWithMicrosoftComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SignInWithMicrosoftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
