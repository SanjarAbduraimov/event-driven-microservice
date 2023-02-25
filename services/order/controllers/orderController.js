var OrderModel = require("../models/orderModel.js");
var orderCreatedMessage = require("../message-bus/send/order.create");
/**
 * orderController.js
 *
 * @description :: Server-side logic for managing orders.
 */
module.exports = {
  /**
   * orderController.list()
   */
  list: function (req, res) {
    OrderModel.find(function (err, orders) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting order.",
          error: err,
        });
      }
      return res.json(orders);
    });
  },

  /**
   * orderController.show()
   */
  show: function (req, res) {
    var id = req.params.id;

    OrderModel.findOne({ _id: id }, function (err, order) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting order.",
          error: err,
        });
      }

      if (!order) {
        return res.status(404).json({
          message: "No such order",
        });
      }

      return res.json(order);
    });
  },

  /**
   * orderController.create()
   */
  create: function (req, res) {
    console.log(req.body, "salom");
    var order = new OrderModel({
      //   user: req.body.user,
      //   items: req.body.items,
      //   shippingAddress: req.body.shippingAddress,
      //   paymentMethod: req.body.paymentMethod,
      //   paymentResult: req.body.paymentResult,
      //   taxPrice: req.body.taxPrice,
      //   shippingPrice: req.body.shippingPrice,
      //   totalPrice: req.body.totalPrice,
      //   isPaid: req.body.isPaid,
      //   paidAt: req.body.paidAt,
      //   isDelivered: req.body.isDelivered,
      //   deliveredAt: req.body.deliveredAt,
    });

    order.save(function (err, order) {
      if (err) {
        return res.status(500).json({
          message: "Error when creating order",
          error: err,
        });
      }
      orderCreatedMessage.send(order);
      return res.status(201).json(order);
    });
  },

  /**
   * orderController.update()
   */
  update: function (req, res) {
    var id = req.params.id;

    OrderModel.findOne({ _id: id }, function (err, order) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting order",
          error: err,
        });
      }

      if (!order) {
        return res.status(404).json({
          message: "No such order",
        });
      }

      order.user = req.body.user ? req.body.user : order.user;
      order.items = req.body.items ? req.body.items : order.items;
      order.shippingAddress = req.body.shippingAddress
        ? req.body.shippingAddress
        : order.shippingAddress;
      order.paymentMethod = req.body.paymentMethod
        ? req.body.paymentMethod
        : order.paymentMethod;
      order.paymentResult = req.body.paymentResult
        ? req.body.paymentResult
        : order.paymentResult;
      order.taxPrice = req.body.taxPrice ? req.body.taxPrice : order.taxPrice;
      order.shippingPrice = req.body.shippingPrice
        ? req.body.shippingPrice
        : order.shippingPrice;
      order.totalPrice = req.body.totalPrice
        ? req.body.totalPrice
        : order.totalPrice;
      order.isPaid = req.body.isPaid ? req.body.isPaid : order.isPaid;
      order.paidAt = req.body.paidAt ? req.body.paidAt : order.paidAt;
      order.isDelivered = req.body.isDelivered
        ? req.body.isDelivered
        : order.isDelivered;
      order.deliveredAt = req.body.deliveredAt
        ? req.body.deliveredAt
        : order.deliveredAt;

      order.save(function (err, order) {
        if (err) {
          return res.status(500).json({
            message: "Error when updating order.",
            error: err,
          });
        }

        return res.json(order);
      });
    });
  },

  /**
   * orderController.remove()
   */
  remove: function (req, res) {
    var id = req.params.id;

    OrderModel.findByIdAndRemove(id, function (err, order) {
      if (err) {
        return res.status(500).json({
          message: "Error when deleting the order.",
          error: err,
        });
      }

      return res.status(204).json();
    });
  },
};
