const { PrismaClient } = require("@prisma/client");
const { Order } = new PrismaClient();

async function getAllSales(req, res) {
  let { number, pages } = req.query;

  try {
    const pageSize = parseInt(number, 10) || 10;
    const currentPage = parseInt(pages, 10) || 1;
    const skip = (currentPage - 1) * pageSize;

    let orders = await Order.findMany({
      skip,
      take: pageSize,
      include: { orderItems: true },
      where: {
        status: "livré",
      },
    });

    const totalOrders = await Order.count();

    const totalSales = orders.reduce((acc, order) => {
      return acc + order.total;
    } , 0); 

    return res.send({
      orders,
      totalOrders,
      currentPage,
      pageSize,
      totalPages: Math.ceil(totalOrders / pageSize),
      totalSales
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send("Une erreur est survenue lors de la lecture des données");
  }
}

module.exports = {
  getAllSales: getAllSales,
};
