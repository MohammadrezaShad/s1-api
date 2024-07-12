import { AggregateRoot } from '@nestjs/cqrs';
import * as bcrypt from 'bcrypt';

import { SendSmsEvent } from '@/modules/user/event/send-sms.event';

export class UserModel extends AggregateRoot {
  constructor(
    private readonly _id: string,
    private readonly displayName: string,
    private readonly email: string,
    private readonly phone: string,
    private readonly isVerified: boolean,
    private readonly password: string,
    private readonly refreshToken: string[],
    private readonly permissions: string[],
    private readonly roles: string[],
    private readonly country: string,
    private readonly city: string,
    private readonly address: string,
    private readonly avatar: string,
  ) {
    super();
  }

  getId(): string {
    return this._id;
  }

  getDisplayName(): string {
    return this.displayName;
  }

  getEmail(): string {
    return this.email;
  }

  getPhone(): string {
    return this.phone;
  }

  getPassword(): string {
    return this.password;
  }

  getIsVerified(): boolean {
    return this.isVerified;
  }

  getRefreshTokens(): string[] {
    return this.refreshToken;
  }

  getPermissions(): string[] {
    return this.permissions;
  }

  getRoles(): string[] {
    return this.roles;
  }

  getCountry(): string {
    return this.country;
  }

  getCity(): string {
    return this.city;
  }

  getAddress(): string {
    return this.address;
  }

  getAvatar(): string {
    return this.avatar;
  }

  sendSms(displayName: string) {
    this.apply(new SendSmsEvent(displayName));
  }

  validatePassword(password: string) {
    return this.password && bcrypt.compare(password, this.password);
  }
}
