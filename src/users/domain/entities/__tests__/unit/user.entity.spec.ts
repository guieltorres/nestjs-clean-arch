import { UserDataBuilder } from '@/users/domain/tests/helpers/user-data-builder';
import { faker } from '@faker-js/faker/.';
import { UserEntity } from '../../user.entity';
import { UserProps } from '../../user.types';

describe('UserEntity unit tests', () => {
  let props: UserProps;
  let sut: UserEntity;

  beforeEach(() => {
    props = UserDataBuilder();
    sut = new UserEntity(props);
  });

  it("Should correctly define and validate the user's name property", () => {
    expect(sut.name).toBeDefined();
    expect(sut.name).toEqual(props.name);
    expect(typeof sut.name).toBe('string');
  });

  it("Should correctly define and validate the user's email property", () => {
    expect(sut.email).toBeDefined();
    expect(sut.email).toEqual(props.email);
    expect(typeof sut.email).toBe('string');
  });

  it("Should correctly define and validate the user's password property", () => {
    expect(sut.password).toBeDefined();
    expect(sut.password).toEqual(props.password);
    expect(typeof sut.password).toBe('string');
  });

  it("Should correctly define and validate the user's createdAt property", () => {
    expect(sut.createdAt).toBeDefined();
    expect(sut.createdAt).toEqual(props.createdAt);
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

    expect(sut.name).toEqual(name);
  });

  it("Should correctly update the user's password property", () => {
    const password = faker.internet.password();
    sut.updatePassword(password);

    expect(sut.password).toEqual(password);
  });
});
