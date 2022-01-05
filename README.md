<div id="top"></div>
<div align="center">
  <a href="https://salla.dev">
    <img src="https://salla.dev/wp-content/themes/salla-portal/dist/img/salla-logo.svg" alt="Logo" width="80" height="80">
  </a>

<h1 align="center">Salla Webhooks Actions</h1>
  <p align="center">
    webhooks-actions  is used with <a href="http://salla.sa/">Salla</a> to simplify the communication between your App and Salla APIs.
    <br />
    <a href="https://salla.dev/"><strong>Explore our blogs »</strong></a>
    <br />
<br /><a href="https://github.com/SallaApp/webhooks-actions/issues/new">Report Bug</a> · <a href="https://github.com/SallaApp/webhooks-actions/discussions/new">Request Feature</a> · <a href="https://t.me/salladev">&lt;/Salla Developers&gt;</a>
  </p>
</div>

# Overview

Webhooks simplify the communication between your App and Salla APIs. In this way, you will be notified whenever your app receives payload/data from the Salla APIs. These webhooks are triggered along with many actions such as an order or product being created, a customer logs in, a coupon is applied, and much more.

This module helps you to listen for notifications from Salla APIs within your Nodejs applications and Expressjs,
By using it you can impelement listernes for every event sent by Salla to your server .

For more information about Salla's Webhooks implementation, check our
[Webhooks Explained](https://salla.dev/blog/webhooks-101/).

## Webhooks Workflow

![Webhooks Workflow](https://salla.dev/wp-content/uploads/2021/06/1-Webhooks-The-Wonder-Land-1-1024x512.png)

## Installation

    $ npm install @salla.sa/webhooks-actions

<p align="right">(<a href="#top">back to top</a>)</p>

## Usage

With Salla Webhooks Actions you can listen for notifications send by Salla to your endpoint set by Expressjs or other frameworks like next.js

### Impelement Using Listeners

You you can add listeners as a function, it will be exeucted every time an event is received .

```javascript
// Import Deps
const express = require("express");
const bodyParser = require("body-parser");
const consolidate = require("consolidate");

// Salla Webhook API
const SallaWebhook = require("@salla.sa/webhooks-actions");

// initialize app
const port = 8081;
let eventsStack = [];
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
require("dotenv").config();

/*
  A .env file should be automatically created in the root directory of your project when createing your project with @salla/SallaCLI.
  environment-specific variables on new lines in the form of NAME=VALUE. For example:
  SALLA_OAUTH_CLIENT_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  SALLA_OAUTH_CLIENT_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  SALLA_WEBHOOK_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  SALLA_AUTHORIZATION_MODE=easy
  SALLA_OAUTH_CLIENT_REDIRECT_URI=https://example.com/oauth/callback
  SALLA_APP_ID=123456789
  ...
*/
const SALLA_WEBHOOK_SECRET = process.env.SALLA_WEBHOOK_SECRET;
SallaWebhook.setSecret(SALLA_WEBHOOK_SECRET);

// Add Webhook listeners

SallaWebhook.on("app.installed", (eventBody, userArgs) => {
  // handel app.installed event
});
SallaWebhook.on("app.stroe.authorize", (eventBody, userArgs) => {
  // handel app.app.stroe.authoriz event
});

// POST /webhook
app.post("/webhook", function (req, res) {
  SallaWebhook.checkActions(req.body, req.headers.authorization, {
    /* your args to pass to action files or listeners */
  });
});
app.listen(port, function () {
  console.log("App is listening on port " + port);
});
```

### Impelement Using Folder Structure
You you can add listeners as files easly using ```ex: salla app create-webhook app.updated ```, the file will be exeucted every time an event is received .

```javascript
/* 
    Actions
      ├───app
      │       installed.js
      │       store.authorize.js
      ├───brand
      │       created.js
      ├───customer
      │       login.js
      │       otp.created.js
      │       request.js
      │       updated.js
      ├───order
      │       created.js
      ├───project
      │       created.js
      └───store
              branch.created.js 
  */

// Import Deps
const express = require("express");
const bodyParser = require("body-parser");
const consolidate = require("consolidate");

// Salla Actions API
const SallaWebhook = require("@salla.sa/webhooks-actions");

// initialize app
const port = 8081;
let eventsStack = [];
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
require("dotenv").config();

/*
  A .env file should be automatically created in the root directory of your project when createing your project with @salla/SallaCLI.
  environment-specific variables on new lines in the form of NAME=VALUE. For example:
  SALLA_OAUTH_CLIENT_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  SALLA_OAUTH_CLIENT_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  SALLA_WEBHOOK_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  SALLA_AUTHORIZATION_MODE=easy
  SALLA_OAUTH_CLIENT_REDIRECT_URI=https://example.com/oauth/callback
  SALLA_APP_ID=123456789
  ...
*/
const SALLA_WEBHOOK_SECRET = process.env.SALLA_WEBHOOK_SECRET;
SallaWebhook.setSecret(SALLA_WEBHOOK_SECRET);

SallaWebhook.on("all", (eventBody, userArgs) => {
  // handel all actions even thats not authorized . good for logging .
});

// the endpoint to receive actions from Salla
app.post("/webhooks", (req, res) =>
  SallaWebhook.checkActions(
    req.body,
    req.headers.authorization,
    ...{
      /* add more arguments, will be passed to listner functions and SallaWebhook js files*/
    }
  )
);

app.listen(port, function () {
  console.log("App is listening on port " + port);
});
```

<p align="right">(<a href="#top">back to top</a>)</p>

Salla already defined a list of the webhooks/actions that are triggered automatically. The predefined webhooks/actions can be found in the folder [`Actions`](https://github.com/SallaApp/Laravel-Start-Kit/tree/master/Actions).

### Order Related Webhooks/Actions

| ** Action Name **                                 | ** Description **                                |
| ------------------------------------------------- | ------------------------------------------------ |
| [order.created](example/Actions/order/created.js) | This indicates a singular order has been created |
| [order.updated](example/Actions/order/update.js) | Details, data and/or content of a specific order have been refreshed updated |
| [order.status.updated](example/Actions/order/status.updated.js) | Whenever there is an order status update, this is triggered |
| [order.cancelled](example/Actions/order/cancelled.js) | This happens when an order is cancelled |
| [order.refunded](example/Actions/order/refunded.js) | The refund action to refund the whole order is triggered. |
| [order.deleted](example/Actions/order/deleted.js) | This indicates an order has been deleted. |
| [order.products.updated](example/Actions/order/products.updated.js) | Order products is updated. |
| [order.payment.updated](example/Actions/order/payment.updated.js) | A payment method has been updated. |
| [order.coupon.updated](example/Actions/order/coupon.updated.js) | This is triggered whenever a Coupon is updated. |
| [order.total.price](example/Actions/order/total.price.js) | A total price of an order has been updated. |
| [order.shipment.creating](example/Actions/order/shipment.creating.js) | This indicates a new shipment is being created. |
| [order.shipment.created](example/Actions/order/shipment.created.js) | This indicates a new shipment has been created. |
| [order.shipment.cancelled](example/Actions/order/shipment.cancelled.js) | This indicates a an order shipment has been cancelled. |
| [order.shipment.return.creating](example/Actions/order/shipment.return.creating.js) | This is triggered when a returned order shipment is being created. |
| [order.shipment.return.created](example/Actions/order/shipment.return.created.js) | This is triggered when a returned order shipment has been created. |
| [order.shipment.return.cancelled](example/Actions/order/shipment.return.cancelled.js) | This is triggered when a returned order shipment has been cancelled. |
| [order.shipment.address.updated](example/Actions/order/shipment.address.updated.js) | Occurs when an Order shipping address is updated. |


<p align="right">(<a href="#top">back to top</a>)</p>

### Products Related Webhooks/Actions

| ** Action Name **                                 | ** Description **                                                                    |
| ------------------------------------------------- | ------------------------------------------------------------------------------------ |
| [product.created](app/Actions/product/created.js) | A new product is created. Payload of the new product are to accompanying the product |
| [product.updated](app/Actions/product/updated.js) | Add/Modify details of a product |
| [product.deleted](app/Actions/product/updated.js) | Delete a product along with all its variants and images |
| [product.available](app/Actions/product/available.js) | Flags a product as stock available |
| [product.quantity.low](app/Actions/product/quantity.low.js) | Shows warnings whenever a stock is of low quantity |


<p align="right">(<a href="#top">back to top</a>)</p>

### Customer Related Webhooks/Actions

| ** Action Name **                                   | ** Description **            |
| --------------------------------------------------- | ---------------------------- |
| [customer.created](app/Actions/customer/created.js) | Create a new customer record |
| [customer.updated](app/Actions/customer/updated.js) | Update details for a customer |
| [customer.login](app/Actions/customer/login.js) | Triggered whenever a customer log in |
| [customer.otp.request](app/Actions/customer/otp.request.js) | One-Time Password request for a customer |


<p align="right">(<a href="#top">back to top</a>)</p>

<p align="right">(<a href="#top">back to top</a>)</p>

### Brand Related Webhooks/Actions

| ** Action Name **                             | ** Description **    |
| --------------------------------------------- | -------------------- |
| [brand.created](app/Actions/brand/created.js) | Creates a new Brand. |
| [brand.updated](app/Actions/brand/updated.js) | Triggered when Information about a sepcific Brand is updated/refurbished/streamline. |
| [brand.deleted](app/Actions/brand/deleted.js) | An existing brand is then deleted and removed from a store. |


<p align="right">(<a href="#top">back to top</a>)</p>

### Store Related Webhooks/Actions

| ** Action Name **                                           | ** Description **    |
| ----------------------------------------------------------- | -------------------- |
| [store.branch.created](app/Actions/store/branch.created.js) | Creates a new store. |
| [store.branch.updated](app/Actions/store/branch.updated.js) | Updates an existing branch. |
| [store.branch.setDefault](app/Actions/store/branch.setDefault.js) | Sets for default a specific branch. |
| [store.branch.activated](app/Actions/store/branch.activated.js) | Activates a disabled branch. |
| [store.branch.deleted](app/Actions/store/branch.activated.js) | Deletes a branch. |


<p align="right">(<a href="#top">back to top</a>)</p>

<!-- COMMANDS -->

<!-- ## Examples

TBD -->

## Tests

    $ npm install --dev
    $ npm test

<p align="right">(<a href="#top">back to top</a>)</p>

## Support

The team is always here to help you. Happen to face an issue? Want to report a bug? You can submit one here on Github using the [Issue Tracker](https://github.com/SallaApp/Salla-CLI/issues/new). If you still have any questions, please contact us via the [Telegram Bot](https://t.me/SallaSupportBot) or join in the Global Developer Community on [Telegram](https://t.me/salladev).

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create.
Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request.
You can also simply open an issue with the tag "enhancement". Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>

## Security

If you discover any securitys-related issues, please email security@salla.sa instead of using the issue tracker.

## Credits

- [Salla](https://github.com/sallaApp)
- [All Contributors](../../contributors)

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.

<p align="right">(<a href="#top">back to top</a>)</p>
