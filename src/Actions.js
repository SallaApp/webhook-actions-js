const path = require("path");

/**
 * `Actions` constructor.
 *
 * Salla webhooks Event Actions.
 *
 * You can use this class to listen to events and execute actions.
 *
 *
 * Examples:
 *
 *  Actions.on(
 *    "app.installed",
 *    (event, userArgs) => {
 *      // handel app.installed event
 *    }
 *  );
 *
 *  Actions.on("all", (event, userArgs) => {
 *    // handel all events even thats not authorized
 *  });
 *
 *  // set the url to capture the webhooks
 *  app.post("/webhooks/notify", (req, res) =>
 *    Actions.checkActions(req.body, req.body.event, req.headers.authorization)
 *  );
 *
 */
class Actions {
  _secret = "";
  setSecret(secret) {
    this._secret = secret;
  }
  _actions_callbacks = {};
  on(event, cb) {
    if (!this._secret)
      throw new Error(
        "Your Must Set secret before adding listeners ..  check .env file"
      );

    if (event == null || cb == null) throw new Error("event or cb is null");

    if (!this._actions_callbacks[event]) this._actions_callbacks[event] = [cb];
    else this._actions_callbacks[event].push(cb);
  }
  removeLastListener(event) {
    if (event == null) throw new Error("Event is null");
    if (this._actions_callbacks[event] && this._actions_callbacks[event].length)
      this._actions_callbacks[event].pop();
    else delete this._actions_callbacks[event];
  }
  getEventPath(str) {
    try {
      str = str.split(".");
      let folder = str.shift();
      return [folder, "/", str.map((e) => e + ".").join("") + "js"].join("");
    } catch (err) {
      console.log(err);
      return "";
    }
  }
  checkActions(eventBody, secret, userArgs) {
    // capture all events even if not authorized
    if (eventBody && this._actions_callbacks["all"])
      this._actions_callbacks["all"].map((cb) => cb(eventBody, userArgs));

    if (!eventBody || this._secret === "" || secret !== this._secret) {
      return;
    }

    // first we fire the callback from listeners set by user
    if (this._actions_callbacks[eventBody.event])
      this._actions_callbacks[eventBody.event].map((cb) =>
        cb(eventBody, userArgs)
      );

    // second we fire the callback from folder actions
    // search in Actions Folder
    try {
      let actionsPath = path.resolve(
        `./Actions/${this.getEventPath(eventBody.event)}`
      );
      // check for security and if the file is a function
      actionsPath = actionsPath.replace("eval", "");

      require(actionsPath)(eventBody, userArgs);
    } catch (e) {
      console.log(
        "Cant Fire callback from Actions Folder .. Event Path Not Found",
        `./Actions/${this.getEventPath(eventBody.event)}`
      );
    }
  }
}

module.exports = new Actions();
