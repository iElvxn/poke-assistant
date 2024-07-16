const express = require("express");
const router = express.Router();
const ingredientController = require("../controllers/ingredientController")

//gets the form for creating ingredient
router.get("/", ingredientController.ingredient_list);

router.get("/create", ingredientController.ingredient_create_get);

//posts the request to make ingredient
router.post("/create", ingredientController.ingredient_create_post);

// gets the detials page of the ingredient
router.get("/:id", ingredientController.ingredient_detail);

//gets the request to delete the ingredient
router.get("/:id/delete", ingredientController.ingredient_delete_get);

//posts the request to delete the ingredient
router.post("/:id/delete", ingredientController.ingredient_delete_post);

//gets the form to update the ingredient
router.get("/:id/update", ingredientController.ingredient_update_get);

//posts the request to update the ingredient
router.post("/:id/update", ingredientController.ingredient_update_post);

module.exports = router;
