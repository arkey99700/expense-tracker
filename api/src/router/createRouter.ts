import { Router } from "express";
import { DBEntity } from "../entity/db-entity";
import EntityService from "../service/EntityService";

const createRouter = function (entityClass: typeof DBEntity) {
  const router = Router();
  const entityService = new EntityService(entityClass);

  router.all("/:id", async (req, res) => {
    switch (req.method) {
      case "GET":
        console.info("get one entity");
        return res.json(await entityService.findById(req.params.id));
      case "PATCH":
        console.info("edit one entity");
        return res.json(await entityService.update(req.params.id, req.body));
      case "DELETE":
        console.info("delete one entity");
        return res.json(await entityService.delete(req.params.id));
      default:
        return res.sendStatus(405);
    }
  });

  router.all("/", async (req, res) => {
    switch (req.method) {
      case "GET":
        console.info("get all entities conforming with GET params");
        return res.json(await entityService.find(req.query));
      case "POST":
        console.info("create new entity");
        return res.json(await entityService.create(req.body));
      default:
        return res.sendStatus(405);
    }
  });

  return router;
};

export default createRouter;
