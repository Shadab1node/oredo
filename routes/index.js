const express = require('express');
const router = require('./customer.route');
const route = express.Router();

route.use(printRoutes);

route.use('/partner',require('./partner.routes'));
route.use('/admin',require('./admin.routes'));
route.use('/customer',require('./customer.route'));
route.use('/feedback',require('./pve-routes'));

/** @description prints route to the console */
function printRoutes(req, res, next) {
    console.log(`************************`);
    console.log(`NEW REQUEST : ${req.method} ${req.originalUrl}`);
    console.log(req.body);
    console.log(`************************`);
    next();
}

module.exports = route;