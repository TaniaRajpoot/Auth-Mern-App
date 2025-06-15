const ensureAthuenticated = require('../Middleware/Auth');


const router = require('express').Router();



router.get('/',ensureAthuenticated, (req,res)=>{
    console.log('--- looged user detail --', req.user);
    res.status(200).json([
      {
        name:"mobile",
        price:"10000"

      },
           {
        name:"TV",
        price:"20000"

      }
    ])
});




module.exports = router;
