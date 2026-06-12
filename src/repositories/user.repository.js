const User = require("../models/User");

const create = (data) => User.create(data);

const findByEmail = (email) => User.findOne({ email });

const findById = (id) => User.findById(id);

module.exports = {
  create,
  findByEmail,
  findById,
};