const db = require("../../../data/db-config");

const getEvents = () => {
  return db("events");
};

const getUserEvents = async (id) => {
  return db("events as e")
    .leftJoin("users as u", "u.user_id", "e.creator_id")
    .select(
      "e.event_id",
      "e.event_name",
      "e.event_description",
      "e.event_location",
      "e.event_date",
      "e.event_time",
      "u.username as event_creator"
    )
    .where("u.user_id", "=", id);
};

const createEvent = async (newEvent) => {
  const [id] = await db("events").insert(newEvent);
  return db("events").where("event_id", id).first();
};

module.exports = {
  getEvents,
  createEvent,
  getUserEvents
};
