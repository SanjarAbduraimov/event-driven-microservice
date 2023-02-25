var NotificationModel = require('../models/notificationModel.js');

/**
 * notificationController.js
 *
 * @description :: Server-side logic for managing notifications.
 */
module.exports = {

    /**
     * notificationController.list()
     */
    list: function (req, res) {
        NotificationModel.find(function (err, notifications) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting notification.',
                    error: err
                });
            }

            return res.json(notifications);
        });
    },

    /**
     * notificationController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        NotificationModel.findOne({_id: id}, function (err, notification) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting notification.',
                    error: err
                });
            }

            if (!notification) {
                return res.status(404).json({
                    message: 'No such notification'
                });
            }

            return res.json(notification);
        });
    },

    /**
     * notificationController.create()
     */
    create: function (req, res) {
        var notification = new NotificationModel({
			sender : req.body.sender,
			reciever : req.body.reciever,
			body : req.body.body,
			subject : req.body.subject,
			category : req.body.category
        });

        notification.save(function (err, notification) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating notification',
                    error: err
                });
            }

            return res.status(201).json(notification);
        });
    },

    /**
     * notificationController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        NotificationModel.findOne({_id: id}, function (err, notification) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting notification',
                    error: err
                });
            }

            if (!notification) {
                return res.status(404).json({
                    message: 'No such notification'
                });
            }

            notification.sender = req.body.sender ? req.body.sender : notification.sender;
			notification.reciever = req.body.reciever ? req.body.reciever : notification.reciever;
			notification.body = req.body.body ? req.body.body : notification.body;
			notification.subject = req.body.subject ? req.body.subject : notification.subject;
			notification.category = req.body.category ? req.body.category : notification.category;
			
            notification.save(function (err, notification) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating notification.',
                        error: err
                    });
                }

                return res.json(notification);
            });
        });
    },

    /**
     * notificationController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        NotificationModel.findByIdAndRemove(id, function (err, notification) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the notification.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
