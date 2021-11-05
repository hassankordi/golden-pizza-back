//** some requires**//
const express = require('express');
const connection = require('./configration/config');
const userRoutes = require('./modules/user/routes/user.router');
require('dotenv').config()
const cors = require('cors');

const categoriesRouter = require('./modules/categories/routes/categories.router');
const pizzaRouter = require('./modules/pizza/routes/pizza.router');
const specialityRouter = require('./modules/speciality/routes/speciality.router');
const combosRouter = require('./modules/combos/routes/combos.router');
const dealsRouter = require('./modules/deals/routes/deals.router');
const additionsRouter = require('./modules/additions/routes/additions.router');





//** end of requires**//

const app = express();
const port = process.env.PORT


//** middleware **//
app.use(express.json())
app.use(cors())



connection();

app.use(userRoutes)

app.use(pizzaRouter)
app.use(categoriesRouter)
app.use(specialityRouter)
app.use(combosRouter)
app.use(dealsRouter)
app.use(additionsRouter)


app.use('/uploads' ,express.static('uploads'))

app.listen(port , function(){
    console.log(`server is running at ${port}`);
})
