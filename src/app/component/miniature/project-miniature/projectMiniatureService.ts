import { BehaviorSubject, firstValueFrom, Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export default class ProjectMiniatureService {
    onDeleteProject: BehaviorSubject<string | undefined> = new BehaviorSubject<string | undefined>(undefined)
    onEditeProject: BehaviorSubject<string | undefined> = new BehaviorSubject<string | undefined>(undefined)

    constructor() {}

    deleteProject(projectId: string) {
        this.onDeleteProject.next(projectId)
    }

    getDeletedProject(): Observable<string | undefined> {
        return this.onDeleteProject.asObservable();
    }


    editProject(projectId: string) {
        this.onEditeProject.next(projectId)
    }

    getEditedProject(): Observable<string | undefined> {
        return this.onEditeProject.asObservable();
    }
}