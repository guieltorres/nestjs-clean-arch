import { Entity } from '../../entities/entity';
import { NotFoundError } from '../../errors/not-found-error';
import { InMemoryRepository } from '../in-memory.repository';
import { StubEntityProps } from './types';

class StubEntity extends Entity<StubEntityProps> {}

class StubInMemoriRepository extends InMemoryRepository<StubEntity> {}

describe('InMemory Repository unit tests', () => {
  let sut: StubInMemoriRepository;

  beforeEach(() => {
    sut = new StubInMemoriRepository();
  });

  it('Should insert a new entity correctly', async () => {
    const entity = new StubEntity({ name: 'Test', price: 10 });
    await sut.insert(entity);
    const [item] = await sut.findAll();

    expect(entity.toJson()).toStrictEqual(item.toJson());
  });

  it('Should throw error when entity not found', async () => {
    await expect(sut.findById('fakeId')).rejects.toThrow(
      new NotFoundError('Entity not found'),
    );
  });

  it('Should find a entity by id correctly', async () => {
    const entity = new StubEntity({ name: 'Test', price: 10 });
    await sut.insert(entity);
    const result = await sut.findById(entity.id);

    expect(entity.toJson()).toStrictEqual(result.toJson());
  });

  it('Should find all entities correctly', async () => {
    const entity = new StubEntity({ name: 'Test', price: 10 });
    await sut.insert(entity);
    const result = await sut.findAll();
    const [item] = result;

    expect(entity.toJson()).toStrictEqual(item.toJson());
    expect(result).toHaveLength(0);
  });

  it('Should throw error when update entity not found', async () => {
    const entity = new StubEntity({ name: 'Test', price: 10 });

    await expect(sut.update(entity)).rejects.toThrow(
      new NotFoundError('Entity not found'),
    );
  });

  it('Should update a entity correctly', async () => {
    const entity = new StubEntity({ name: 'Test', price: 10 });
    await sut.insert(entity);
    const newEntity = new StubEntity(
      { name: 'Updated name', price: 20 },
      entity.id,
    );
    await sut.update(newEntity);
    const result = await sut.findById(entity.id);

    expect(result.toJson()).toStrictEqual(newEntity.toJson());
  });

  it('Should delete a entity correctly', async () => {
    const entity = new StubEntity({ name: 'Test', price: 10 });
    await sut.insert(entity);
    await sut.delete(entity.id);
    const result = await sut.findAll();

    expect(result).toHaveLength(0);
  });
});
