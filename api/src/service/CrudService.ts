import { DBEntity } from "../entity/db-entity";

class CrudService {
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

  async find(params?: DBEntity) {
    return await this.entityClass.find({ where: { ...params } });
  }
}

export default CrudService;
