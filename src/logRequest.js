// A simple function that is used to
// print log messages, and some request
// information
module.exports = (req, tag, message) => {
    console.log(`${new Date().toLocaleString()} (${req.method} ${req.path}) [${tag}] => ${message}`)
}