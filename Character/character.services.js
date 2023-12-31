const Character = require("./character.schema");

const createCharacter = async (req, res) => {
  try {
    const character = await Character.create(req.body);
    res.status(201).json({ success: true, data: character });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCharacters = async (req, res) => {
  try {
    const characters = await Character.find();
    res.status(200).json({
      success: true,
      data: characters,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCharacter = async (req, res) => {
  try {
    const character = await Character.findById(req.params.id);
    res.status(200).json({
      success: true,
      data: character,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCharacter = async (req, res) => {
  try {
    const character = await Character.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json({
      success: true,
      data: character,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteCharacter = async (req, res) => {
  try {
    const character = await Character.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      data: character,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createCharacter,
  getCharacters,
  getCharacter,
  updateCharacter,
  deleteCharacter,
};
