const router = require("express").Router();
const booksController = require("../controller/books")();

router.get("/books", booksController.list);
router.get("/books/total-quantity", booksController.getQuantity);
router.get("/books/fetchByName", booksController.fetchByName);
router.post("/books", booksController.insert);
router.put("/books/:id", booksController.update);
router.delete("/books/:id", booksController.remove);

module.exports = router;
