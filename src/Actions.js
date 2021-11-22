const path = require('path');

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
 *  Actions.addListener(
 *    "app.installed",
 *    (event, userArgs) => {
 *      // handel app.installed event
 *    }
 *  );
 *
 *  Actions.addListener("all", (event, userArgs) => {
 *    // handel all events even thats not authorized
 *  });
 *
 *  // set the url to caputre the webhooks
 *  app.post("/webhooks/notify", (req, res) =>
 *    Actions.checkActions(req.body, req.body.event, req.headers.authorization)
 *  );
 *
 */
class Actions {
    _secret = '';

    setSecret(secret) {
        this._secret = secret;
    }

    _actions_callbacks = {};

    addListener(event, cb) {
        if (this._secret === '')
            throw new Error(
                'Your Must Set secret before adding listenres ..  check .env file'
            );

        if (event == null || cb == null) throw new Error('event or cb is null');
        this._actions_callbacks[event] = cb;
    }

    removeListener(event) {
        if (event == null) throw new Error('event is null');
        delete this._actions_callbacks[event];
    }

    checkActions(eventBody, secret, userArgs) {
        if (!eventBody || this._secret !== '' || secret !== this._secret) {
            ///
        }

        // first we fire the callback from listeners set by user
        if (this._actions_callbacks[eventBody.event])
            this._actions_callbacks[eventBody.event](eventBody, userArgs);


        // second we fire the callback from folder actions
        // search in Actions Folder
        try {
            require(path.resolve(
                `./Actions${
                    eventBody.event
                        .split('.')
                        .map((e) => '/' + e)
                        .join('') + '.js'
                }`
            ))(eventBody, userArgs);
        } catch (e) {
            console.log(
                'Cant Fire callback from Actions Folder .. Event Path Not Found',
                `./Actions${
                    eventBody.event
                        .split('.')
                        .map((e) => '/' + e)
                        .join('') + '.js'
                }`
            );
        }

        // capture all events even if not authorized
        if (eventBody && this._actions_callbacks['all'])
            this._actions_callbacks['all'](eventBody, userArgs);
    }
}

module.exports = new Actions();
