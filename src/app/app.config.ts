import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import * as InjectTokens from './list-token';
import { environment } from './environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import ProjectService from './core/services/projectService';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    importProvidersFrom([AngularFirestoreModule, AngularFireModule.initializeApp(environment.firebaseConfig)]),
    {
      provide: InjectTokens.POJECT_SERVICE_TOKEN, useValue: ProjectService
    }
  ]
};
