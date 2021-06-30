module.exports = (router) => {
   router.get("/hello", (req, res) => {
        console.log("==? hellow")
        res.send({message: 'hello'})
    });
    return router;
}