const restaurantSchema = require("../model/models");

const getRestaurantsList = async (req, res) => {
  const data = await restaurantSchema.find({}, { id: 1, name: 1 });
  res.status(200).json(data);
};

const getOrders = async (req, res) => {
  const { resId } = req.params;
  const data = await restaurantSchema.findOne({ id: resId }, { orders: 1 });
  res.status(200).json(data);
};

const getOrderWithId = async (req, res) => {
  const { resId, id } = req.params;
  const data = await restaurantSchema.findOne(
    { id: resId, "orders.id": id },
    { "orders.$": 1 }
  );
  if (data?.orders[0]) {
    res.status(200).json(data.orders[0]);
  } else {
    res.status(404).send();
  }
};

const authenticate = async (req, res) => {
  const { resId, adminType, password } = req.params;
  try {
    if (adminType == "Chef") {
      const dataExists = await restaurantSchema.exists({
        id: resId,
        "credentials.chef": password,
      });
      res.status(200).json({ result: dataExists ? true : false });
    } else if (adminType === "Operator") {
      const dataExists = await restaurantSchema.exists({
        id: resId,
        "credentials.operator": password,
      });
      res.status(200).json({ result: dataExists ? true : false });
    }
  } catch (e) {
    res.status(404).json({ result: false });
  }
};
const getMenu = async (req, res) => {
  const { resId } = req.params;
  const data = await restaurantSchema.findOne({ id: resId }, { menu: 1 });
  res.status(200).json(data.menu);
};
const getLatestOrderNumber = async (req, res) => {
  const { resId } = req.params;
  const data = await restaurantSchema.findOne(
    { id: resId },
    { latestOrderNumber: 1 }
  );
  res.status(200).json(data.latestOrderNumber);
};

const addOrder = async (req, res) => {
  const { resId } = req.params;
  const order = req.body;
  const resData = await restaurantSchema.findOne(
    { id: resId },
    { latestOrderNumber: 1 }
  );
  const updatedOrderNumber = resData.latestOrderNumber + 1;
  order.id = updatedOrderNumber;
  console.log(order);

  await restaurantSchema.updateOne(
    { id: resId },
    {
      $push: { orders: order },
      $set: { latestOrderNumber: updatedOrderNumber },
    }
  );
  res.status(200).send("cool");
};

const updateOrderStatus = async (req, res) => {
  const { resId, orderId } = req.params;
  const status = req.body.status;
  console.log(status);
  await restaurantSchema.updateOne(
    { id: resId, "orders.id": orderId },
    {
      $set: { "orders.$.orderStatus": status },
    }
  );
  res.status(200).json({ updated: true });
};

module.exports = {
  getRestaurantsList,
  getOrderWithId,
  getMenu,
  getOrders,
  getLatestOrderNumber,
  authenticate,
  addOrder,
  updateOrderStatus,
};
