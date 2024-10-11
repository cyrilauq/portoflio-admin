import { Observable } from "rxjs";
import Skill from "../../models/skill";

export default interface ISkillService {
    getSkills(): Observable<Skill[]>

    loadSkills(): void

    insert(skill: Skill): Observable<boolean>

    delete(skillName: string): Observable<boolean>
}