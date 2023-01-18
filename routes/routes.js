const express = require("express");
const {
  getMenu,
  getOrderWithId,
  getRestaurantsList,
  getOrders,
  getLatestOrderNumber,
  authenticate,
  addOrder,
  updateOrderStatus,
} = require("../controller/controllers");
const router = express.Router();

router.route("/restaurants").get(getRestaurantsList);
router.route("/orders/:resId").get(getOrders).post(addOrder);
router.route("/getOrderWithId/:resId/:id").get(getOrderWithId);
router.route("/getMenu/:resId").get(getMenu);
router.route("/authenticate/:resId/:adminType/:password").get(authenticate);
router.route("/latestOrderNumber/:resId").get(getLatestOrderNumber);
router.route("/updateOrderStatus/:resId/:orderId").put(updateOrderStatus);

module.exports = router;
