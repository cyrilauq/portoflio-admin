import { BehaviorSubject, firstValueFrom, Observable, of } from "rxjs";
import Project from "../models/project";
import { forwardRef, Injectable } from "@angular/core";
import { AngularFirestore } from '@angular/fire/compat/firestore';
import Link from "../models/link";
import { AngularFireStorage } from "@angular/fire/compat/storage";
import IProjectService from "./interfaces/iProjectService";

@Injectable({
    providedIn: 'root',
})
export default class ProjectService implements IProjectService {
    projects: BehaviorSubject<Project[]> = new BehaviorSubject<Project[]>([])

    constructor(private firestore: AngularFirestore, private storage: AngularFireStorage) {}

    getProjects(): Observable<Project[]> {
        const collectionRef = this.firestore.collection('projects');
        collectionRef.get().subscribe(datas => {
            const convertedDatas: Project[] = datas.docs.map<Project>(doc => {
                const docData = doc.data() as any;
                docData.links = Object.keys(docData.links).map(k => Link.fromObject({ link: docData.links[k], name: k }))
                return Project.fromObject({ ...docData, id: doc.id })
            })
            this.projects.next(convertedDatas)
        })
        return this.projects.asObservable()
    }
    
    createProject(project: Project, miniature: File, screenshots: File[]): Observable<boolean> {
        const result = new BehaviorSubject(false);
        const collectionRef = this.firestore.collection('projects');
        const links: any = {}
        project.links.forEach(link => links[link.name] = link.link)
        const toSave = { 
            name: project.name,
            description: project.description,
            technologies: project.technologies,
            miniatureLink: project.miniatureLink, 
            screenshotLinks: project.screenshotLinks, 
            liveLink: project.liveLink, 
            links
        }
        const task = collectionRef.add(toSave);
        task.then(async value => {
            const docId = value.id
            await this.uploadFile(miniature)
            const miniatureLink = await this.uploadFile(miniature)
            const screenshotLinks = Array<string>(0);
            for (const screenshot of screenshots) {
                screenshotLinks.push(await this.uploadFile(screenshot))
            }
            this.projects.next([...this.projects.value, Project.fromObject({ ...project, id: docId })])
            return value.update({
                miniatureLink,
                screenshotLinks
            })
        }).then(() => result.next(true))
        .catch(err => {
            result.error(new Error(err))
            console.log(err);
        })
        return result.asObservable();
    }
    
    private async uploadFile(file: File): Promise<string> {
        const storageRef = this.storage.ref('uploads/' + file.name);
        await storageRef.put(file);
        // await for the observable to return the first value
        return (await firstValueFrom(storageRef.getDownloadURL())) as string
    }

    deleteProject(projectId: string): Observable<boolean> {
        const result = new BehaviorSubject(false);
        const collectionRef = this.firestore.collection('projects');
        collectionRef.doc(projectId).delete()
            .then(() => {
                result.next(true);
                this.projects.next([...this.projects.value.filter(p => p.id !== projectId)])
            })
            .catch((error) => {
                console.error(error);
                result.error(new Error("An error occured while deleting the project"))
            })
        return result.asObservable();
    }
}