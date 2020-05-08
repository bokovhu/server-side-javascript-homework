const User = function (id, name, emailAddress) {
    this.id = id;
    this.name = name;
    this.emailAddress = emailAddress;
};

module.exports = (user) =>
    new User(user._id.toString(), user.name, user.emailAddress);
