import { NgForm } from '@angular/forms';
import { RenderResult } from '@testing-library/angular';
import { WrapperComponent } from '../../template/wrapper.component';

export const getNgForm = (
  component: RenderResult<WrapperComponent, WrapperComponent>
) => {
  return component.fixture.debugElement.children[0].injector.get(NgForm);
};
