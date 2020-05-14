var expect = require("chai").expect;
const crypto = require("crypto");

var authenticationMW = require("../src/mw/authentication");

describe("Authentication MW", () => {
    it("Should allow through without authentication", () => {
        let req = {
            cookies: {
                jwt: undefined,
            },
        };
        let res = {
            locals: {},
        };
        let next = {
            called: false,
            fn() {
                this.called = true;
            },
        };

        authenticationMW({
            db: {
                User: {},
            },
        })(req, res, next.fn.bind(next));

        expect(next.called).to.be.true;
        expect(res.locals.authenticated).to.be.false;
    });

    it("Should authenticate user with valid JWT", () => {
        let secret = new Buffer("password");
        let userObjectId = "507f1f77bcf86cd799439011";
        let userObject = { _id: userObjectId };

        let req = {
            cookies: {
                // This token expires in 2065
                jwt:
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIiLCJuYW1lIjoiIiwiaWF0IjozMDAwMDAwMDAwLCJ1aWQiOiI1MDdmMWY3N2JjZjg2Y2Q3OTk0MzkwMTEifQ.bHETU6J50egHj9bt4V20Zpx0um1ZuqefNByPJ4TthBg",
            },
            app: {
                locals: {
                    jwtSecret: secret,
                },
            },
        };
        let res = {
            locals: {},
        };
        let User = {
            findById(oid) {
                expect(oid.toString()).to.eq(userObjectId);
                return {
                    then(fn, err) {
                        fn(userObject);
                    },
                };
            },
        };
        let next = {
            called: false,
            fn() {
                this.called = true;
            },
        };

        authenticationMW({
            db: {
                User: User,
            },
        })(req, res, next.fn.bind(next));

        expect(res.locals.userId).to.eq(userObjectId);
        expect(res.locals.user).to.eq(userObject);
        expect(res.locals.authenticated).to.be.true;
        expect(next.called).to.be.true;
    });

    it("Should handle error correctly when user is not found", () => {
        let secret = new Buffer("password");
        let userObjectId = "507f1f77bcf86cd799439011";
        let error = {};

        let req = {
            cookies: {
                // This token expires in 2065
                jwt:
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIiLCJuYW1lIjoiIiwiaWF0IjozMDAwMDAwMDAwLCJ1aWQiOiI1MDdmMWY3N2JjZjg2Y2Q3OTk0MzkwMTEifQ.bHETU6J50egHj9bt4V20Zpx0um1ZuqefNByPJ4TthBg",
            },
            app: {
                locals: {
                    jwtSecret: secret,
                },
            },
        };
        let res = {
            locals: {},
            render(tmpl) {
                expect(tmpl).to.eq('error');
            }
        };
        let User = {
            findById(oid) {
                expect(oid.toString()).to.eq(userObjectId);
                return {
                    then(fn, err) {
                        err(error);
                    },
                };
            },
        };
        let next = {
            called: false,
            fn() {
                this.called = true;
            },
        };

        authenticationMW({
            db: {
                User: User,
            },
        })(req, res, next.fn.bind(next));

        expect(res.locals.error).to.eq(error);
        expect(next.called).to.be.false;
    });

    it("Should handle error correctly when JWT is invalid", () => {
        let req = {
            cookies: {
                // This token expires in 2065
                jwt:
                    "invalid token",
            },
            app: {
                locals: {
                    jwtSecret: crypto.randomBytes(32),
                },
            },
        };
        let res = {
            locals: {},
            redirect(path) {
                expect(path).to.eq('/error-invalid-jwt');
            }
        };
        let next = {
            called: false,
            fn() {
                this.called = true;
            },
        };

        authenticationMW({
            db: {
                User: {},
            },
        })(req, res, next.fn.bind(next));

        expect(res.locals.authenticated).to.be.false;
        expect(next.called).to.be.false;
    });
});
