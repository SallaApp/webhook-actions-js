# Salla Webhook Example

If you want to run the project

1. Create a Salla app on [Salla Partner Portal](https://salla.partners/login).
1. Add `https://YOUR_SERVER_URL/webhook` as a webhook URL .
1. Rename the file `.env.exmaple` to `.env` and filling with the following:

   ```sh
   WEBHOOK_SECRET=
   ```

1. Copy the WEBHOOK SECRET and paste it into the `.env`.
1. Install the dependencies.

   ```sh
   npm install
   ```

1. Run the application.

   ```sh
   node app.js
   ```

1. Navigate to `https://YOUR_SERVER_URL/`.
