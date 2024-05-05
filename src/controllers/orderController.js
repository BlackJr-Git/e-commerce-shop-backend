const { PrismaClient } = require("@prisma/client");
const { Order } = new PrismaClient();
const { User } = new PrismaClient();
const { sendMail } = require("../utils/send-mail");

/*
--------------------------
Retrieve one order from 
the database.
--------------------------
*/

async function getOneOrder(req, res) {
  const { orderId } = req.params;
  try {
    const order = await Order.findUnique({
      where: {
        id: +orderId,
      },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
        user: true,
      },
    });

    if (order.id) {
      return res.send(order);
    }
    return res
      .status(404)
      .send(`La commande avec l'id : ${orderId} n'existe pas`);
  } catch (error) {
    console.log(error);
    return res.status(500).send("erreur lors de la lecture des données");
  }
}

/*
  --------------------------
  Retrieve all orders from 
  the database.
  --------------------------
*/
async function getAllOrders(req, res) {
  let { number, pages, status } = req.query;

  try {
    const pageSize = parseInt(number, 10) || 10;
    const currentPage = parseInt(pages, 10) || 1;
    let skip = (currentPage - 1) * pageSize;

    let queryConditions = {
      skip,
      take: pageSize,
      orderBy: { createdAt: "desc" },
      include: { orderItems: true, user: true },
    };

    if (status && status !== "undefined" && status !== "all") {
      queryConditions.where = { status };
    }

    const [orders, totalOrders] = await Promise.all([
      Order.findMany(queryConditions),
      Order.count({ where: queryConditions.where }),
    ]);

    return res.send({
      orders,
      totalOrders,
      currentPage,
      pageSize,
      totalPages: Math.ceil(totalOrders / pageSize),
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send("Une erreur est survenue lors de la lecture des données");
  }
}

/*
  --------------------------
  Create and save a new order
  in the database
  --------------------------
  */

async function getOneUserOrder(req, res) {
  const { userId } = req.params;
  let { number, pages } = req.query;
  try {
    const pageSize = parseInt(number, 10) || 10;
    const currentPage = parseInt(pages, 10) || 1;
    const skip = (currentPage - 1) * pageSize;
    const order = await Order.findMany({
      where: {
        userId: +userId,
      },
      skip,
      take: pageSize,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
        user: true,
      },
    });

    return res.send(order);
  } catch (error) {
    console.log(error);
  }
}

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
      include: {
        orderItems: {
          include: {
            product: true, // Inclure les données de la table Product
          },
        },
        user: true,
      },
    });

    const user = await User.findUnique({
      where: {
        id: +userId,
      },
    });

    sendMail(
      "Nouvelle commande",
      `Bonjour ${user.name}, vous venez de passer une commande.`,
      user,
      newOrder
    );

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

async function updateOrder(req, res) {
  const { orderId } = req.params;
  try {
    const updatedOrder = await Order.update({
      where: {
        id: +orderId,
      },
      data: req.body || {},
    });

    if (updatedOrder.id) {
      return res.status(201).send(updatedOrder);
    }
    return res
      .status(404)
      .send(`La commande avec l'id : ${orderId} n'existe pas`);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Erreur lors de la modification des donnes");
  }
}

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
  getAllOrders: getAllOrders,
  updateOrder: updateOrder,
  getOneOrder: getOneOrder,
  getOneUserOrder: getOneUserOrder,
};
