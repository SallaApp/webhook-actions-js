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
    <br /><a href="https://github.com/SallaApp/webhooks-actions/issues/new">Report Bug</a> · <a href="https://github.com/SallaApp/webhooks-actions/discussions/new">Request Feature</a>
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

## Impelement

With Salla Webhooks Actions you can listen for notifications send by Salla to your endpoint set by Expressjs or other frameworks like next.js

### Impelement Using Listeners

You you can add listeners , the function passed will be exeucted every time an event is received .

```javascript
// Import Deps
const express = require("express");
const bodyParser = require("body-parser");
const consolidate = require("consolidate");

// Salla Actions API
const SallaActions = require("@salla.sa/webhooks-actions");

// initialize app
const port = 8081;
let eventsStack = [];
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
require("dotenv").config();

/*
  Create a .env file in the root directory of your project.
  Add environment-specific variables on new lines in the form of NAME=VALUE. For example:
  WEBHOOK_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  ...
*/
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
SallaActions.setSecret(WEBHOOK_SECRET);

// Add Webhook listeners

SallaActions.addListener("app.installed", (eventBody, userArgs) => {
  // handel app.installed event
});
SallaActions.addListener("app.stroe.authorize", (eventBody, userArgs) => {
  // handel app.app.stroe.authoriz event
});

// POST /notifiy
app.post("/webhooks/notifiy", function (req, res) {
  SallaActions.checkActions(req.body, req.headers.authorization, {
    /* your args to pass to action files or listeners */
  });
});
app.listen(port, function () {
  console.log("App is listening on port " + port);
});
```

### Impelement Using Folder Structure

You you can add actions as folders and files ,by creating a folder named Actions on the top level of your project .. the js file will be exeucted when an event is received .

```javascript
/* 
    Actions
      ├───app
      │   │   installed.js
      │   │
      │   └───store
      │           authorize.js
      ├───brand
      │       created.js
      ├───customer
      │   │   created.js
      │   │   login.js
      │   │   updated.js
      │   └───otp
      │           request.js
      ├───order
      │       created.js
      └───project
              created.js 
  */

// Import Deps
const express = require("express");
const bodyParser = require("body-parser");
const consolidate = require("consolidate");

// Salla Actions API
const SallaActions = require("@salla.sa/webhooks-actions");

// initialize app
const port = 8081;
let eventsStack = [];
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
require("dotenv").config();
/*
  Create a .env file in the root directory of your project.
  Add environment-specific variables on new lines in the form of NAME=VALUE. For example:
  WEBHOOK_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  ...
*/
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
SallaActions.setSecret(WEBHOOK_SECRET);

SallaActions.addListener("all", (eventBody, userArgs) => {
  // handel all actions even thats not authorized . good for logging .
});

// the endpoint to receive actions from Salla
app.post("/webhooks/notifiy", (req, res) =>
  SallaActions.checkActions(
    req.body,
    req.headers.authorization,
    ...{
      /* add more arguments, will be passed to listner functions and SallaActions js files*/
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

| ** Action Name **                                                                | ** Description **                                                            |
| -------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| [order.created](app/Actions/Order/Created.php)                                   | This indicates a singular order has been created                             |
| [order.updated](app/Actions/Order/Updated.php)                                   | Details, data and/or content of a specific order have been refreshed updated |
| [order.status.updated](app/Actions/Order/StatusUpdated.php)                      | Whenever there is an order status update, this is triggered                  |
| [order.cancelled](app/Actions/Order/Cancelled.php)                               | This happens when an order is cancelled                                      |
| [order.refunded](app/Actions/Order/Refunded.php)                                 | The refund action to refund the whole order is triggered.                    |
| [order.deleted](app/Actions/Order/)                                              | This indicates an order has been deleted                                     |
| [order.products.updated](app/Actions/Order/ProductsUpdated.php)                  | Order products is updated                                                    |
| [order.payment.updated](app/Actions/Order/PaymentUpdated.php)                    | A payment method has been updated                                            |
| [order.coupon.updated](app/Actions/Order/CouponUpdated.php)                      | This is triggered whenever a Coupon is updated                               |
| [order.total.price.updated](app/Actions/Order/TotalPriceUpdated.php)             | A total price of an order has been updated                                   |
| [order.shipment.creating](app/Actions/Order/ShipmentCreating.php)                | This indicates a new shipment is being created                               |
| [order.shipment.created](app/Actions/Order/ShipmentCreated.php)                  | This indicates a new shipment has been created                               |
| [order.shipment.cancelled](app/Actions/Order/ShipmentCancelled.php)              | This indicates a an order shipment has been cancelled                        |
| [order.shipment.return.creating](app/Actions/Order/ShipmentReturnCreating.php)   | This is triggered when a returned order shipment is being created            |
| [order.shipment.return.created](app/Actions/Order/ShipmentReturnCreated.php)     | This is triggered when a returned order shipment has been created            |
| [order.shipment.return.cancelled](app/Actions/Order/ShipmentReturnCancelled.php) | This is triggered when a returned order shipment has been cancelled          |
| [order.shipping.address.updated](app/Actions/Order/ShippingAddressUpdated.php)   | Occurs when an Order shipping address is updated                             |

<p align="right">(<a href="#top">back to top</a>)</p>

### Products Related Webhooks/Actions

| ** Action Name **                                           | ** Description **                                                                    |
| ----------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| [product.created](app/Actions/Product/Created.php)          | A new product is created. Payload of the new product are to accompanying the product |
| [product.updated](app/Actions/Product/Updated.php)          | Add/Modify details of a product                                                      |
| [product.deleted](app/Actions/Product/Deleted.php)          | Delete a product along with all its variants and images                              |
| [product.available](app/Actions/Product/Available.php)      | Flags a product as stock available                                                   |
| [product.quantity.low](app/Actions/Product/QuantityLow.php) | Shows warnings whenever a stock is of low quantity                                   |

<p align="right">(<a href="#top">back to top</a>)</p>

### Customer Related Webhooks/Actions

| ** Action Name **                                           | ** Description **                        |
| ----------------------------------------------------------- | ---------------------------------------- |
| [customer.created](app/Actions/Customer/Created.php)        | Create a new customer record             |
| [customer.updated](app/Actions/Customer/Updated.php)        | Update details for a customer            |
| [customer.login](app/Actions/Customer/Login.php)            | Triggered whenever a customer log in     |
| [customer.otp.request](app/Actions/Customer/OtpRequest.php) | One-Time Password request for a customer |

<p align="right">(<a href="#top">back to top</a>)</p>

### Category Related Webhooks/Actions

| ** Action Name **                                    | ** Description **                                   |
| ---------------------------------------------------- | --------------------------------------------------- |
| [category.created](app/Actions/Category/Created.php) | Creates a new category for products to be put under |
| [category.updated](app/Actions/Category/Updated.php) | Add new or reform existing category details         |

<p align="right">(<a href="#top">back to top</a>)</p>

### Brand Related Webhooks/Actions

| ** Action Name **                              | ** Description **                                                                    |
| ---------------------------------------------- | ------------------------------------------------------------------------------------ |
| [brand.created](app/Actions/Brand/Created.php) | Creates a new Brand.                                                                 |
| [brand.updated](app/Actions/Brand/Updated.php) | Triggered when Information about a sepcific Brand is updated/refurbished/streamlined |
| [brand.deleted](app/Actions/Brand/Deleted.php) | An existing brand is then deleted and removed from a store                           |

<p align="right">(<a href="#top">back to top</a>)</p>

### Store Related Webhooks/Actions

| ** Action Name **                                                 | ** Description **                  |
| ----------------------------------------------------------------- | ---------------------------------- |
| [store.branch.created](app/Actions/Store/BranchCreated.php)       | Creates a new store.               |
| [store.branch.updated](app/Actions/Store/BranchUpdated.php)       | Updates an existing branch         |
| [store.branch.setDefault](app/Actions/Store/BranchSetDefault.php) | Sets for default a specific branch |
| [store.branch.activated](app/Actions/Store/BranchActivated.php)   | Activates a disabled branch        |
| [store.branch.deleted](app/Actions/Store/BranchDeleted.php)       | Deletes a branch                   |
| [storetax.created](app/Actions/Store/TaxCreated.php)              | Creats a new Store Tax             |

<p align="right">(<a href="#top">back to top</a>)</p>

### Coupon Related Webhooks/Actions

| ** Action Name **                                                         | ** Description **                               |
| ------------------------------------------------------------------------- | ----------------------------------------------- |
| [coupon.applied](app/Actions/Miscellaneous/CouponApplied.php)             | Creates a discount code in the form of a coupon |
| [review.added](app/Actions/Miscellaneous/ReviewAdded.php)                 | A product review has been added                 |
| [abandoned.cart](app/Actions/Miscellaneous/AbandonedCart.php)             | Outputs a list of abandoned carts               |
| [specialoffer.created](app/Actions/Miscellaneous/SpecialofferCreated.php) | Creates a new special offer                     |
| [specialoffer.updated](app/Actions/Miscellaneous/SpecialofferUpdated.php) | Updates a special offer                         |

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- COMMANDS -->

## Tests

    $ npm install --dev
    $ npm test

<p align="right">(<a href="#top">back to top</a>)</p>

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
