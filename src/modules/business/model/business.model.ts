import { AggregateRoot } from '@nestjs/cqrs';
import { WorkHour } from '../entity/work-hour.entity';

export class BusinessModel extends AggregateRoot {
  constructor(
    private readonly _id: string,
    private readonly name: string,
    private readonly slug: string,
    private readonly email: string,
    private readonly phone: string,
    private readonly address: string,
    private readonly address2: string,
    private readonly description: string,
    private readonly webAddress: string,
    private readonly workHour: WorkHour[],
    private readonly lat: number,
    private readonly long: number,
    private readonly taxonomies: string[],
    private readonly thumbnail: string,
    private readonly images: string[],
    private readonly user: string,
  ) {
    super();
  }

  getId(): string {
    return this._id;
  }

  getName(): string {
    return this.name;
  }

  getSlug(): string {
    return this.slug;
  }

  getEmail(): string {
    return this.email;
  }

  getPhone(): string {
    return this.phone;
  }

  getAddress(): string {
    return this.address;
  }

  getAddress2(): string {
    return this.address2;
  }

  getDescription(): string {
    return this.description;
  }

  getWebAddress(): string {
    return this.webAddress;
  }

  getWorkHour(): WorkHour[] {
    return this.workHour;
  }

  getLat(): number {
    return this.lat;
  }

  getLong(): number {
    return this.long;
  }

  getTaxonomies(): string[] {
    return this.taxonomies;
  }

  getThumbnail(): string {
    return this.thumbnail;
  }

  getImages(): string[] {
    return this.images;
  }

  getUser(): string {
    return this.user;
  }
}
