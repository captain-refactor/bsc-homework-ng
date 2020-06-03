import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppModule} from './app/app.module';
import {environment} from './environments/environment';
import {registerLocaleData} from '@angular/common';
import localeCs from '@angular/common/locales/cs';
import localeEn from '@angular/common/locales/en';

registerLocaleData(localeCs);
registerLocaleData(localeEn, 'en-US');

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
