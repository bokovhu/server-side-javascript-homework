module.exports = (req, res, next) => {
    res.clearCookie("jwt");
    res.render("logout");
};
