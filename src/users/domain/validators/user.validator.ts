import { ClassValidatorFields } from '@/shared/domain/validators/fields/class-validator-fields';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserProps } from '../entities/user.types';

class UserRules {
  @MaxLength(255)
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  @MaxLength(255)
  @IsNotEmpty()
  @IsString()
  email: string;

  @MaxLength(100)
  @MinLength(8)
  @IsString()
  password: string;

  @IsDate()
  @IsOptional()
  createdAt?: Date;

  constructor({ name, email, password, createdAt }: Partial<UserProps>) {
    Object.assign(this, { name, email, password, createdAt });
  }
}

class UserValidatorFields extends ClassValidatorFields<UserRules> {
  isValid({ name, email, password, createdAt }: Partial<UserProps>): boolean {
    return super.isValid(new UserRules({ name, email, password, createdAt }));
  }
}

class UserValidatorFactory {
  static create(): UserValidatorFields {
    return new UserValidatorFields();
  }
}

export { UserRules, UserValidatorFactory, UserValidatorFields };
