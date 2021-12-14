const Events = require("./events-model");
const router = require("express").Router();

router.get("/", (req, res, next) => {
  Events.getEvents()
    .then((eventsArr) => {
      res.status(200).json(eventsArr);
    })
    .catch((err) => {
      next({ status: 500, message: err });
    });
});

router.get("/:id", (req, res, next) => {
  Events.getUserEvents(req.params.id)
    .then((event) => {
      res.status(200).json(event);
    })
    .catch((err) => {
      next({ status: 500, message: err });
    });
});

router.post("/", (req, res, next) => {
  Events.createEvent(req.body)
    .then((newEvent) => {
      res.status(201).json(newEvent);
    })
    .catch((err) => {
      next({ status: 500, message: err });
    });
});

module.exports = router;
