// public class Link
// {
//     public Guid Id { get; set; }
//     public required string Icon { get; set; }
//     public required string Name { get; set; }
//     public required string Url { get; set; }
// }

import { Icon } from '@app/utils/icons';

export class Link {
  public constructor(
    public readonly id: string,
    public icon: Icon,
    public name: string,
    public url: string
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static fromAny(obj: any) {
    return new Link(
      typeof obj.id === 'string' ? obj.id : '',
      typeof obj.icon === 'string' ? obj.icon : 'default',
      typeof obj.name === 'string' ? obj.name : '',
      typeof obj.url === 'string' ? obj.url : ''
    );
  }
}
