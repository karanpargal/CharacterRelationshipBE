const Relation = require("./relation.schema");

const createRelation = async (req, res) => {
  try {
    const relation = await Relation.create(req.body);
    res.status(201).json({ success: true, data: relation });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRelations = async (req, res) => {
  try {
    const relations = await Relation.find();
    res.status(200).json({
      success: true,
      data: relations,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRelation = async (req, res) => {
  try {
    const relation = await Relation.findById(req.params.id);
    res.status(200).json({
      success: true,
      data: relation,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateRelation = async (req, res) => {
  try {
    const relation = await Relation.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({
      success: true,
      data: relation,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteRelation = async (req, res) => {
  try {
    const relation = await Relation.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      data: relation,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createRelation,
  getRelations,
  getRelation,
  updateRelation,
  deleteRelation,
};
