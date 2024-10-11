export default class Skill {
    name: string
    expertise: number

    constructor(object: { name: string, expertise: number }) {
        this.name = object.name
        this.expertise = object.expertise
    }

    static fromObject(object: { name: string, expertise: number }) {
        return new Skill(object)
    }
}