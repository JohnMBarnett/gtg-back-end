const db = require("../../../data/db-config");
const Events = require("../events/events-model");

const getAllUsers = () => {
  return db("users");
};

const add = async (newUser) => {
  const [newObj] = await db("users").insert(newUser,[
    "user_id",
    "username"
  ]);
  return newObj;
};

const getBy = async (filter) => {
  return db("users").where(filter);
};

const getById = async (id) => {
  const eventsArr = await Events.getUserEvents(id);
  const user = await db("users").where("user_id", id).first();

  let completedUser = user;
  completedUser.user_events = eventsArr;

  return completedUser;
};

const updateUser = async (id, updatedUser) => {
  if (updatedUser.username) {
    return db("users")
      .where("user_id", id)
      .first()
      .update({ username: updatedUser.username });
  } else {
    return db("users")
      .where("user_id", id)
      .first()
      .update({ password: updatedUser.password });
  }
};

module.exports = {
  add,
  getBy,
  getAllUsers,
  getById,
  updateUser,
};
