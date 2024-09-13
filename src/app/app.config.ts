import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { graphqlProvider } from './graphql.provider';

export const appConfig: ApplicationConfig = {
  providers: [ provideRouter(routes) , provideZoneChangeDetection({ eventCoalescing: true }), provideHttpClient(), provideHttpClient(), graphqlProvider]
};
