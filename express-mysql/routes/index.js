const router = require("express").Router();
const animalsController = require("../controllers/animals")();
const veterinariansController = require("../controllers/veterinarians")();
const examsController = require("../controllers/exams")();

router.get("/animals", animalsController.list);
router.post("/animals", animalsController.create);
router.put("/animals/:id", animalsController.update);
router.delete("/animals/:id", animalsController.remove);

router.get("/veterinarians", veterinariansController.list);
router.post("/veterinarians", veterinariansController.create);
router.put("/veterinarians/:id", veterinariansController.update);
router.delete("/veterinarians/:id", veterinariansController.remove);

router.get("/exams", examsController.list);
router.post("/exams", examsController.create);
router.put("/exams/:id", examsController.update);
router.delete("/exams/:id", examsController.remove);

module.exports = router;
