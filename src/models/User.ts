import { Link } from './Link';

export class User {
  public constructor(
    public readonly id: string,
    public name: string,
    public pseudonym: string,
    public bio: string,
    public roles: string[],
    public links: Link[],
    public createdAt: Date,
    public updatedAt: Date
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static fromAny(obj: any) {
    return new User(
      typeof obj.id === 'string' ? obj.id : '',
      typeof obj.name === 'string' ? obj.name : '',
      typeof obj.pseudonym === 'string' ? obj.pseudonym : '',
      typeof obj.bio === 'string' ? obj.bio : '',
      Array.isArray(obj.roles) ? obj.roles : [],
      Array.isArray(obj.links) ? obj.links.map((l: string) => Link.fromAny(l)) : [],
      new Date(typeof obj.createdAt === 'string' ? obj.createdAt : Date.now()),
      new Date(typeof obj.updatedAt === 'string' ? obj.updatedAt : Date.now())
    );
  }
}
