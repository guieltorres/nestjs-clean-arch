import { Entity } from '@/shared/domain/entities/entity';
import { UserValidatorFactory } from '../validators/user.validator';
import { UserProps } from './user.types';

export class UserEntity extends Entity<UserProps> {
  constructor(
    protected readonly props: UserProps,
    id?: string,
  ) {
    UserEntity.validate(props);
    super(props, id);
    this.props.createdAt = this.props.createdAt ?? new Date();
  }

  update(value: string) {
    UserEntity.validate({ ...this.props, name: value });
    this.name = value;
  }

  updatePassword(value: string) {
    UserEntity.validate({ ...this.props, password: value });
    this.password = value;
  }

  get name() {
    return this.props.name;
  }

  get email() {
    return this.props.email;
  }

  get password() {
    return this.props.password;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  private set name(value: string) {
    this.props.name = value;
  }

  private set password(value: string) {
    this.props.password = value;
  }

  static validate(props: UserProps) {
    const validator = UserValidatorFactory.create();
    validator.isValid(props);
  }
}
