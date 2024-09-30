import { Observable } from "rxjs";
import Project from "../../models/project";

export default interface IProjectService {

    getProjects(): Observable<Project[]>
    
    createProject(project: Project, miniature: File, screenshots: File[]): Observable<boolean> 
}