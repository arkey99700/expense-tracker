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
    } catch (error) {
      return { error };
    }
  }

  async update(id: string, params: DBEntity) {
    try {
      await this.entityClass.update(id, params);

      return this.entityClass.findOne({ where: { id: Number(id) } });
    } catch (error) {
      return { error };
    }
  }

  async delete(id: string) {
    try {
      return await this.entityClass.delete(id);
    } catch (error) {
      return { error };
    }
  }

  async findById(id: string) {
    try {
      return await this.entityClass.findOne({ where: { id: Number(id) } });
    } catch (error) {
      return { error };
    }
  }

  async find(params?: QueryParams) {
    try {
      return await this.entityClass.find({
        skip: params?.offset,
        take: params?.limit,
      });
    } catch (error) {
      return { error };
    }
  }
}

export default EntityService;
