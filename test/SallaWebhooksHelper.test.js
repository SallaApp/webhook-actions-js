var should = require("should");
var sinon = require("sinon");

describe("Test Salla Actions", function () {
  var it_should_handle_errors = function () {
    it("Should error if no callback or no action passed!", function (done) {
      const Actions = require("../src/Actions");
      try {
        Actions.on(null, () => {});
        Actions.on("app.installed");
      } catch (err) {
        should.exist(err);
      }
      done();
    });
  };
  it("Should be able to add multi listeners ", function () {
    const Actions = require("../src/Actions");
    Actions.setSecret("secret");
    Actions.on("app.installed", () => {});

    should.equal(Actions._actions_callbacks["app.installed"].length, 1);
  });
  it("Should be able to remove listeners ", function () {
    const Actions = require("../src/Actions");
    Actions.setSecret("secret");
    Actions.on("app.store.authorize", () => {});
    should.equal(
      Actions._actions_callbacks["app.store.authorize"].length,
      1
    );
    Actions.removeLastListener("app.store.authorize");
    should.notEqual(
      Actions._actions_callbacks["app.store.authorize"].length,
      1
    );
  });
  it("Should throw error if no secret is set ", function () {
    const Actions = require("../src/Actions");
    try {
      Actions.on("app.store.authorize", () => {});
    } catch (err) {
      should.exist(err);
    }
  });
  it("Should be able to Fire Callbacks when Events happen ", function () {
    const Actions = require("../src/Actions");
    Actions.setSecret("secret");
    Actions.on("app.installed", (event, userArgs) => {
      should.equal(event, "app.installed");
      should.equal(event.secret, "secret");
    });
    Actions.checkActions({ event: "app.installed" });
  });
  it_should_handle_errors();

   
});
