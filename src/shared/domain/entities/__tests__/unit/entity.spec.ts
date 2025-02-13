import { faker } from '@faker-js/faker/.';
import { validate } from 'uuid';
import { Entity } from '../../entity';
import { StubProps } from './types';

class StubEntity extends Entity<StubProps> {}

describe('Entity unit tests', () => {
  it('Should create a entity with a valid id', () => {
    const props: StubProps = {
      prop1: faker.person.firstName(),
      prop2: faker.number.int(),
    };

    const sut = new StubEntity(props);

    expect(validate(sut.id)).toBeTruthy();
  });

  it('Should accept a valid id uuid', () => {
    const id = '0f559043-e3ab-44d7-adc7-82633df49199';
    const props: StubProps = {
      prop1: faker.person.firstName(),
      prop2: faker.number.int(),
    };

    const sut = new StubEntity(props, id);

    expect(validate(sut.id)).toBeTruthy();
    expect(sut.id).toEqual(id);
  });

  it('Should convert entity to JSON correctly', () => {
    const id = '0f559043-e3ab-44d7-adc7-82633df49199';
    const props: StubProps = {
      prop1: faker.person.firstName(),
      prop2: faker.number.int(),
    };

    const sut = new StubEntity(props, id);

    expect(sut.toJson()).toStrictEqual({
      id,
      ...props,
    });
  });
});
