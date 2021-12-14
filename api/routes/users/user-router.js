const Users = require("./user-model");
const router = require("express").Router();
const { validateUserEdit } = require("../../middleware");

router.get("/", (req, res, next) => {
  Users.getAllUsers()
    .then((usersArr) => {
      res.status(200).json(usersArr);
    })
    .catch((err) => {
      next({ status: 500, message: err });
    });
});

router.get("/:id", (req, res, next) => {
  Users.getById(req.params.id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      next({ status: 500, message: err });
    });
});

router.put("/:id", validateUserEdit, (req, res, next) => {
  Users.updateUser(req.params.id, req.body)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((err) => {
      next({ status: 500, message: err });
    });
});

module.exports = router;
