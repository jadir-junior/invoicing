import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { enableProdMode } from '@angular/core';

if (process.env['NODE_ENV'] === 'production') {
  enableProdMode();
}

console.log('>>>> NX_ENV', process.env['NX_MICROSOFT_AUTH_PARAMS_URI_DEFAULT']);

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
