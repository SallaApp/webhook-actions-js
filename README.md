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
  Create a .env file in the root directory of your project.
  Add environment-specific variables on new lines in the form of NAME=VALUE. For example:
  WEBHOOK_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  ...
*/
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
SallaWebhook.setSecret(WEBHOOK_SECRET);

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

You you can add actions as folders and files ,by creating a folder named Actions on the top level of your project .. the js file will be exeucted when an event is received .

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
  Create a .env file in the root directory of your project.
  Add environment-specific variables on new lines in the form of NAME=VALUE. For example:
  WEBHOOK_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  ...
*/
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
SallaWebhook.setSecret(WEBHOOK_SECRET);

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

<p align="right">(<a href="#top">back to top</a>)</p>

### Products Related Webhooks/Actions

| ** Action Name **                                 | ** Description **                                                                    |
| ------------------------------------------------- | ------------------------------------------------------------------------------------ |
| [product.created](app/Actions/product/created.js) | A new product is created. Payload of the new product are to accompanying the product |

<p align="right">(<a href="#top">back to top</a>)</p>

### Customer Related Webhooks/Actions

| ** Action Name **                                   | ** Description **            |
| --------------------------------------------------- | ---------------------------- |
| [customer.created](app/Actions/customer/created.js) | Create a new customer record |

<p align="right">(<a href="#top">back to top</a>)</p>

<p align="right">(<a href="#top">back to top</a>)</p>

### Brand Related Webhooks/Actions

| ** Action Name **                             | ** Description **    |
| --------------------------------------------- | -------------------- |
| [brand.created](app/Actions/brand/created.js) | Creates a new Brand. |

<p align="right">(<a href="#top">back to top</a>)</p>

### Store Related Webhooks/Actions

| ** Action Name **                                           | ** Description **    |
| ----------------------------------------------------------- | -------------------- |
| [store.branch.created](app/Actions/store/branch.created.js) | Creates a new store. |

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
