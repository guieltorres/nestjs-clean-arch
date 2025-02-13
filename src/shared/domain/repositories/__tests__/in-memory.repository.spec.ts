import { Entity } from '../../entities/entity';
import { InMemoryRepository } from '../in-memory.repository';
import { StubEntityProps } from './types';

class StubEntity extends Entity<StubEntityProps> {}

class StubInMemoriRepository extends InMemoryRepository<StubEntity> {}

describe('InMemory Repository unit tests', () => {
  let sut: StubInMemoriRepository;

  beforeEach(() => {
    sut = new StubInMemoriRepository();
  });

  it('Should insert a new entity', async () => {
    const entity = new StubEntity({ name: 'Test', price: 10 });
    await sut.insert(entity);
    const [item] = sut.items;
    expect(entity.toJson()).toStrictEqual(item.toJson());
  });
});
