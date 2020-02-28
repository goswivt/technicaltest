const router = require ('express').Router();
const User = require ('../models/Data');


router.post("/data", (req, res) => {
    var myData = new User(req.body);
    myData.save()
      .then(item => {
        res.send("item saved to database");
      })
      .catch(err => {
        res.status(400).send("unable to save to database");
      });
});


module.exports= router;