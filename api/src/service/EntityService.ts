import { DBEntity } from "../entity/db-entity";

type QueryParams = {
  limit?: number;
  offset?: number;
};

class EntityService {
  entityClass;

  constructor(entityClass: typeof DBEntity) {
    this.entityClass = entityClass;
  }

  async create(params: DBEntity) {
    try {
      const entity = this.entityClass.create({ ...params });
      return await entity.save();
    } catch (e) {
      return { error: e };
    }
  }

  async update(id: string, params: DBEntity) {
    await this.entityClass.update(id, params);

    return this.entityClass.findOne({ where: { id: Number(id) } });
  }

  async delete(id: string) {
    try {
      return await this.entityClass.delete(id);
    } catch (e) {
      return { error: e };
    }
  }

  async findById(id: string) {
    return await this.entityClass.findOne({ where: { id: Number(id) } });
  }

  async find(params?: QueryParams) {
    return await this.entityClass.find({
      skip: params?.offset,
      take: params?.limit,
    });
  }
}

export default EntityService;
