var should = require("should");
var sinon = require("sinon");

describe("Test Salla Actions", function () {
  var it_should_handle_errors = function () {
    it("Should error if no callback or no action passed!", function (done) {
      const Actions = require("../src/Actions");
      try {
        Actions.addListener(null, () => {});
        Actions.addListener("app.installed");
      } catch (err) {
        should.exist(err);
      }
      done();
    });
  };
  it("Should be able to add listeners ", function () {
    const Actions = require("../src/Actions");
    Actions.setSecret("secret");
    Actions.addListener("app.installed", () => {});

    should.equal(
      typeof Actions._actions_callbacks["app.installed"],
      "function"
    );
  });
  it("Should be able to remove listeners ", function () {
    const Actions = require("../src/Actions");
    Actions.setSecret("secret");
    Actions.addListener("app.stroe.authorize", () => {});
    Actions.removeListener("app.stroe.authorize");
    should.notEqual(
      typeof Actions._actions_callbacks["app.stroe.authorize"],
      "function"
    );
  });
  it("Should throw error if no seceret is set ", function () {
    const Actions = require("../src/Actions");
    try {
      Actions.addListener("app.stroe.authorize", () => {});
    } catch (err) {
      should.exist(err);
    }
  });
  it("Should be able to Fire Callbacks when Events happen ", function () {
    const Actions = require("../src/Actions");
    Actions.setSecret("secret");
    Actions.addListener("app.installed", (event, userArgs) => {
      should.equal(event, "app.installed");
      should.equal(event.secret, "secret");
    });
    Actions.checkActions({ event: "app.installed" });
  });
  it_should_handle_errors();
});
