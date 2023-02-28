const db = require("../models");
const Curse = db.curses;
const Op = db.Sequelize.Op;

//Create and save a new Curse
exports.create = (req, res) => {
    // validate request
    if (!req.body.phrase) {
        res.status(400).send({
            message: "Content cannot be empty"
        });
        return;
    }

    // Create a Curse
    const curse = {
        phrase: req.body.phrase,
        published: req.body.published
    };
    
    // Save Curse in the database
    Curse.create(curse)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while creating the curse."
            });
        });
};

// Retrieve all Curses from the database.
exports.findAll = (req, res) => {
    const phrase = req.query.phrase;
  var condition = phrase ? { phrase: { [Op.like]: `%${phrase}%` } } : null;

  Curse.findAll({ where: condition})
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving curses."
        });
    });
};

// Find a single curse with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

  Curse.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find curse with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving curse with id=" + id
      });
    });
};

// Update a Curse by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Curse.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Curse was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update curse with id=${id}. Maybe the curse was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating curse with id=" + id
        });
      });
};

// Delete a Curse with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Curse.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Curse was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete curse with id=${id}. Maybe the curse was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete curse with id=" + id
        });
      });
};

// Delete all Curses from the database.
exports.deleteAll = (req, res) => {
    Curse.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} curses were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all curses."
          });
        });
};

// Find all published Curses
exports.findAllPublished = (req, res) => {
    Curses.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving curses."
      });
    });
};