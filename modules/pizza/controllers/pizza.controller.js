const Pizza = require('../model/pizza.model')


const addToPizzaSec = async (req, res) => {
    let { title, over_view, smallPrice, largePrice, mediumPrice } = req.body;
    console.log(req.body);
    console.log(req.file);
    let img_src;
    // != undefined
    if (req.file ) {
        
        img_src = `http://localhost:2526/${req.file.path}`

    }


    console.log('in is controller');
    console.log(img_src);


    try {

        const findPizza = await Pizza.findOne({ title })
        console.log('ti6le');

        if (findPizza) {
            res.json({ message: 'this title is already exist try another title' })
        }
        else {
            console.log('else');
            console.log(img_src);

            if (img_src) {
                const newPizza = await Pizza.insertMany({ title, over_view, img_src, smallPrice, largePrice, mediumPrice })
                res.json({ message: 'pizza added succes to pizza section with photo', newPizza })

            }
            else {
                const newPizza = await Pizza.insertMany({ title, over_view, smallPrice, largePrice, mediumPrice })
                res.json({ message: 'pizza added succes to pizza without photo', newPizza })
            }



        }

    } catch (error) {
        res.json({ message: 'error to add pizza', error })

    }

}


const getPizzaSec = async (req, res) => {

    try {
        const pizzaSec = await Pizza.find({})
        res.json({ pizzaSec })

    } catch (error) {
        res.json({ error })

    }
}





module.exports = {
    addToPizzaSec,
    getPizzaSec

}