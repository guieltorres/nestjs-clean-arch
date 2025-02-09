import { UserDataBuilder } from '@/users/domain/tests/helpers/user-data-builder';
import { faker } from '@faker-js/faker/.';
import { UserEntity } from '../../user.entity';
import { UserProps } from '../../user.types';

describe('UserEntity unit tests', () => {
  let props: UserProps;
  let sut: UserEntity;

  beforeEach(() => {
    UserEntity.validate = jest.fn();
    props = UserDataBuilder();
    sut = new UserEntity(props);
  });

  it('Should instantiate user entity with correct properties', () => {
    expect(UserEntity.validate).toHaveBeenCalled();
    expect(sut.name).toEqual(props.name);
    expect(sut.email).toEqual(props.email);
    expect(sut.password).toEqual(props.password);
    expect(sut.createdAt).toEqual(props.createdAt);
  });

  it('Should define and validate user properties', () => {
    expect(sut.name).toBeDefined();
    expect(sut.email).toBeDefined();
    expect(sut.password).toBeDefined();
    expect(sut.createdAt).toBeDefined();

    expect(typeof sut.name).toBe('string');
    expect(typeof sut.email).toBe('string');
    expect(typeof sut.password).toBe('string');
    expect(sut.createdAt).toBeInstanceOf(Date);
  });

  it("Should correctly set the user's name property", () => {
    const name = faker.person.fullName();
    sut['name'] = name;

    expect(sut.name).toEqual(name);
  });

  it("Should correctly set the user's password property", () => {
    const password = faker.internet.password();
    sut['password'] = password;

    expect(sut.password).toEqual(password);
  });

  it("Should correctly update the user's properties", () => {
    const name = faker.person.fullName();
    sut.update(name);

    expect(UserEntity.validate).toHaveBeenCalled();
    expect(sut.name).toEqual(name);
  });

  it("Should correctly update the user's password property", () => {
    const password = faker.internet.password();
    sut.updatePassword(password);

    expect(UserEntity.validate).toHaveBeenCalled();
    expect(sut.password).toEqual(password);
  });
});
