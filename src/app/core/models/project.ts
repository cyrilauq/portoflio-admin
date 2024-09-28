import Link from './link'

export default class Project {
  private _id: string
  public get id(): string {
    return this._id
  }
  private _name: string
  public get name(): string {
    return this._name
  }
  private _description: string
  public get description(): string {
    return this._description
  }
  private _links: Array<Link>
  public get links(): Array<Link> {
    return this._links
  }
  private _technologies: Array<string>
  public get technologies(): Array<string> {
    return this._technologies
  }
  private _miniatureLink: string
  public get miniatureLink(): string {
    return this._miniatureLink
  }
  private _screenshotLinks: Array<string>
  public get screenshotLinks(): Array<string> {
    return this._screenshotLinks
  }
  private _liveLink: string
  public get liveLink(): string {
    return this._liveLink
  }

  private constructor(object: {
    id: string
    name: string
    description: string
    links: Array<Link>
    technologies: Array<string>
    miniatureLink: string
    screenshotLinks: Array<string>
    liveLink: string
  }) {
    this._id = object.id
    this._name = object.name
    this._description = object.description
    this._links = object.links
    this._technologies = object.technologies
    this._miniatureLink = object.miniatureLink
    this._screenshotLinks = object.screenshotLinks
    this._liveLink = object.liveLink
  }

  public static fromObject(object: {
    id?: string
    name?: string
    description?: string
    links?: Array<any>
    technologies?: Array<string>
    miniatureLink?: string
    screenshotLinks?: Array<string>
    liveLink?: string
  }) {
    const project = new Project({
      id: object.id || 'No id provided',
      name: object.name || 'No project name provided',
      description: object.description || 'No description provided',
      links: object.links?.map((l) => Link.fromObject(l)) || [],
      technologies: object.technologies || [],
      miniatureLink: object.miniatureLink || '',
      screenshotLinks: object.screenshotLinks || [],
      liveLink: object.liveLink || ''
    })
    return project
  }
}