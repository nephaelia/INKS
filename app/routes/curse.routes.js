module.exports = app => {
    const curses = require("../controllers/curse.controller.js");
  
    var router = require("express").Router();
  
    // Create a new curse
    router.post("/", curses.create);
  
    // Retrieve all curses
    router.get("/", curses.findAll);
  
    // Retrieve all published curses
    router.get("/published", curses.findAllPublished);
  
    // Retrieve a single curse with id
    router.get("/:id", curses.findOne);
  
    // Update a curse with id
    router.put("/:id", curses.update);
  
    // Delete a curse with id
    router.delete("/:id", curses.delete);
  
    // Delete all curses
    router.delete("/", curses.deleteAll);
  
    app.use('/api/curses', router);
  };
  