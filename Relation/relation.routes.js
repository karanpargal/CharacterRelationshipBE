const { Router } = require("express");
const {
  createRelation,
  getRelations,
  getRelation,
  updateRelation,
  deleteRelation,
} = require("./relation.services");

const router = Router();

router.post("/", createRelation);
router.get("/", getRelations);
router.get("/:id", getRelation);
router.put("/:id", updateRelation);
router.delete("/:id", deleteRelation);

module.exports = router;
