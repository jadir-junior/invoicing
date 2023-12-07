import { KeyFilterDirective } from './../../../../libs/shared/ui/src/lib/key-filter/key-filter.directive';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextDirective } from '@invoicing/ui';

interface Hero {
  id: number;
  name: string;
  power: string;
  alterEgo?: string;
}

@Component({
  standalone: true,
  imports: [FormsModule, CommonModule, InputTextDirective, KeyFilterDirective],
  selector: 'invoicing-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  powers = ['Really Smaert', 'Super Flexible', 'Super Hot', 'Weather Changer'];
  model: Hero = {
    id: 18,
    name: 'Dr. IQ',
    power: this.powers[0],
    alterEgo: 'Chuck Overstreet',
  };
  submitted = false;

  onSubmit() {
    this.submitted = true;
  }
}
