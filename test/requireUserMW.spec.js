var expect = require("chai").expect;
var requireUserMW = require("../src/mw/requireUser");

describe("Authorization MW", () => {
    it("Should redirect to login if user is not authenticated", () => {
        let req = {};
        let res = {
            didRedirect: false,
            redirect(path) {
                this.didRedirect = true;
            },
            locals: {
                authenticated: false,
            },
        };

        requireUserMW({})(req, res, () => {});

        expect(res.didRedirect).to.be.true;
    });

    it("Should allow through if user is authenticated", () => {
        let req = {};
        let res = {
            locals: {
                authenticated: true,
            },
        };
        let next = {
            called: false,
            fn() {
                this.called = true;
            },
        };

        requireUserMW({})(req, res, next.fn.bind(next));

        expect(next.called).to.be.true;
    });
});
