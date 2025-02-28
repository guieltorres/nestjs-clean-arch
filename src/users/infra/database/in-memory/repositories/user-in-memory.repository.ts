import { ConflictError } from '@/shared/domain/errors/conflict-error';
import { NotFoundError } from '@/shared/domain/errors/not-found-error';
import { InMemoryRepository } from '@/shared/domain/repositories/in-memory.repository';
import { UserEntity } from '@/users/domain/entities/user.entity';
import { UserRepository } from '@/users/domain/repositories/user.repository';

export class UserInMemoryRepository
  extends InMemoryRepository<UserEntity>
  implements UserRepository
{
  async findByEmail(email: string): Promise<UserEntity> {
    const entity = await this._getByEmail(email);
    if (!entity) {
      throw new NotFoundError(`User entity not found with email: ${email}`);
    }
    return entity;
  }

  async emailExists(email: string): Promise<void> {
    const entity = await this._getByEmail(email);
    if (entity) {
      throw new ConflictError(`User email address already used`);
    }
  }

  protected async _getByEmail(email: string): Promise<UserEntity | null> {
    const entity = this.items.find((item) => item.email === email);
    return entity || null;
  }
}
