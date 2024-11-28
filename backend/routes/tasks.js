import express from "express";
import Task from "../models/Task.js";

const router = express.Router();

// lesen
// /api/tasks?sortField=title&sortDirection=asc
router.get("/", async (req, res, next) => {
  try {
     //default Wert
    let sortDirection = "asc";
    // falls gesetzt als Query Parameter: passe an
    if (req.query.sortDirection === "desc") {
      sortDirection = "desc";
    }

    // Sortierung
    let sortField = "title"; //default Wert
    // falls gesetzt als Query Parameter: passe an
    if (req.query.sortField === "status") {
      sortField = "status";
    } else if (req.query.sortField === "priority") {
      sortField = "priority";
    }

    // Filterung - setzen wir in find() ein
    let filter = {}; // default Filterobjekt ist leer -> dann wird nicht gefiltert
    // passe an falls query parameter gesetzt und akzeptablen Wert enthält
    if (req.query.prio && ["low", "medium", "high"].includes(req.query.prio)) {
      filter = {priority: req.query.prio};
    }

    const data = await Task.find(filter).sort({[sortField]:sortDirection});
    res.status(200).json(data);
  } catch(error) {
    next(error);
  }
})

// erstellen
router.post("/", async (req, res, next) => {
  try {

    const { title, description, priority, status } = req.body;

    if (!title) {
      return res.status(400).json({message: "Invalid task"});
    }

    const task = await Task.create({
      title: title,
      description: description ? description : "",
      priority: priority,
      status: status
    })

    res.status(201).json(task);

  } catch(error) {
    next(error);
  }
})

// löschen
router.delete("/:id", async (req, res, next) => {
  try {
    const data = await Task.deleteOne({_id: req.params.id});
    if (data.deletedCount === 0) {
      return res.status(404).json({message: "task not found"});
    }
    res.status(204).send();
  } catch(error) {
    next(error);
  }
})


// bearbeiten
router.patch("/:id", async (req, res, next) => {
  try {
    // wenn req.body leer oder wenn alle der Felder undefined/leer sind (mindestens ein Feld muss geupdated werden)
    if (!req.body || (!req.body.title && !req.body.description && !req.body.status && !req.body.priority)) {
      return res.status(400).json({ message: "Request body cannot be empty" });
    }

    const data = await Task.updateOne({_id: req.params.id}, req.body, {runValidators: true});
    // hat nicht geklappt (da nicht gefunden)
    if (data.matchedCount === 0) {
      return res.status(404).json({message: "task not found"});
    }
    res.status(200).json({message: "successfully updated"});
  } catch(error) {
    next(error);
  }
})

export default router;