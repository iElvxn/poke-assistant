const category_controller = require("../controllers/categoryController")
const express = require("express");
const router = express.Router();

router.get("/", category_controller.category_list);

router.get("/create", category_controller.category_create_get);
router.post("/create", category_controller.category_create_post);

router.get("/:id", category_controller.category_details);
router.get("/:id/delete", category_controller.category_delete_get);
router.post("/:id/delete", category_controller.category_delete_post);
router.get("/:id/update", category_controller.category_update_get);
router.post("/:id/update", category_controller.category_update_post);


module.exports = router;

