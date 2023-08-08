const { Router } = require("express");
const {
  createCharacter,
  getCharacters,
  getCharacter,
  updateCharacter,
  deleteCharacter,
} = require("./character.services");
const router = Router();

router.post("/", createCharacter);
router.get("/", getCharacters);
router.get("/:id", getCharacter);
router.put("/:id", updateCharacter);
router.delete("/:id", deleteCharacter);

module.exports = router; 
