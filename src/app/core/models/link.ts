export default class Link {
  private _link: string
  public get link() {
    return this._link
  }

  private _name: string
  public get name() {
    return this._name
  }

  private constructor(object: { link: string; name: string }) {
    this._link = object.link
    this._name = object.name
  }

  public static fromObject(object: { link: string; name: string }) {
    const link = new Link(object)
    return link
  }
}