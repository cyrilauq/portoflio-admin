export default class Skill {
    name: string
    expertise: number
    type: string

    constructor(object: { name: string, expertise: number, type: string }) {
        this.name = object.name
        this.expertise = object.expertise
        this.type = object.type
    }

    static fromObject(object: { name: string, expertise: number, type: string }) {
        return new Skill(object)
    }
}