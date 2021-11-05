const Deals = require('../model/deals.model');


const addToDealsSec = async (req, res) => {
    let {  over_view ,price } = req.body;
    console.log(req.body);
 
   

    console.log('in is controller');
  


    try {

        const findDeals = await Deals.findOne({ over_view })
        console.log('ti6le');

        if (findDeals) {
            res.json({ message: 'this over_view is already exist try another over_view' })
        }
        else {
            console.log('else');
          

            
                const newDeals = await Deals.insertMany({  over_view, price })
                res.json({ message: 'newDeals added succes to deals without photo', newDeals })
            



        }

    } catch (error) {
        res.json({ message: 'error to add deals', error })

    }

}


const getDealsSec = async (req, res) => {

    try {
        const dealsSec = await Deals.find({})
        res.json({ dealsSec })

    } catch (error) {
        res.json({ error })

    }
}





module.exports = {
    addToDealsSec,
    getDealsSec

}