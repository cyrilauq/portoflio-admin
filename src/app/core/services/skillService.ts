import { BehaviorSubject, Observable } from "rxjs";
import Skill from "../models/skill";
import ISkillService from "./interfaces/iSkillService";
import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore";
import { AngularFireStorage } from "@angular/fire/compat/storage";

@Injectable({
    providedIn: 'root',
})
export default class SkillService implements ISkillService {
    private skills: BehaviorSubject<Skill[]> = new BehaviorSubject<Skill[]>([])
    skillsCollection: AngularFirestoreCollection<Skill>;

    constructor(private firestore: AngularFirestore) {
        this.skillsCollection = firestore.collection<Skill>("skills")
    }

    delete(skillName: string): Observable<boolean> {
        const result = new BehaviorSubject(false)
        const skillId = this.generateUniqueName(skillName)
        this.skillsCollection.doc(skillId).delete()
            .then(() => {
                result.next(true);
                this.skills.next([ ...this.skills.value.filter(s => s.name !== skillName) ])
            })
            .catch(error => {
                console.error(error);
                result.error(new Error("An error occured while saving the skill"))
            })
        return result.asObservable()
    }

    getSkills(): Observable<Skill[]> {
        if(this.skills.value.length == 0) {
            this.loadSkills()
        }
        return this.skills.asObservable()
    }

    loadSkills(): void {
        this.skillsCollection.get().subscribe(datas => {
            const convertedDatas: Skill[] = datas.docs.map<Skill>(doc => {
                const docData = doc.data() as any;
                return Skill.fromObject({ ...docData })
            })
            this.skills.next(convertedDatas)
        })
    }
    
    insert(skill: Skill): Observable<boolean> {
        const result = new BehaviorSubject(false)
        const skillId = this.generateUniqueName(skill.name)
        this.skillsCollection.doc(skillId).ref.get()
            .then(results => {
                if(!results.exists) {
                    return this.skillsCollection.doc(skillId).set(skill)
                        .then(() => {
                            result.next(true);
                            this.skills.next([ ...this.skills.value, skill ])
                        })
                        .catch(error => {
                            console.error(error);
                            result.error(new Error("An error occured while saving the skill"))
                        })
                }
                else {
                    result.error(new Error("The given skill already exists"))
                    return
                }
            })
        return result.asObservable()
    }

    generateUniqueName(skillName: string): string {
        return skillName.toLocaleLowerCase().replaceAll(' ', '')
    }

}