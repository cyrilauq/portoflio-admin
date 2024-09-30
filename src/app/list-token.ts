import { InjectionToken } from '@angular/core';
import IProjectService from './core/services/interfaces/iProjectService';

export const POJECT_SERVICE_TOKEN = new InjectionToken<IProjectService>('IProjectService');