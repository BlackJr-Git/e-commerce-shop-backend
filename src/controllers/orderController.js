const { PrismaClient } = require("@prisma/client");
const { Order } = new PrismaClient();

/*
--------------------------
Retrieve one order from 
the database.
--------------------------
*/

/*
  --------------------------
  Retrieve all orders from 
  the database.
  --------------------------
*/

/*
  --------------------------
  Create and save a new order
  in the database
  --------------------------
  */

async function createOrder(req, res) {
  const { userId, status, total, orderItems } = req.body;
  //   res.send(orderItems)

  const orderData = {
    userId: parseInt(userId),
    status: status,
    total: parseFloat(total),
    orderItems: {
      create: orderItems.map((item) => ({
        productId: parseInt(item.productId),
        quantity: parseInt(item.quantity),
        price: parseFloat(item.price),
      })),
    },
  };

  try {
    const newOrder = await Order.create({
      data: orderData,
      include: { orderItems: true },
    });
    return res.status(201).send(newOrder);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send("Une erreur est survenue lors de la création de la commande");
  }
}

/*
  --------------------------
  Update a order by the id 
  in the request
  --------------------------
*/

/*
  --------------------------
  Delete a order with 
  the specified id 
  in the request
  --------------------------
*/

/*
  --------------------------
  Delete all orders from 
  the database.
  --------------------------
  */

module.exports = {
  createOrder: createOrder,
};
