const Combos = require('../model/combos.model')


const addToCombosSec = async (req, res) => {
    let { title, over_view,price } = req.body;
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

        const findCombos = await Combos.findOne({ title })
        console.log('ti6le');

        if (findCombos) {
            res.json({ message: 'this title is already exist try another title' })
        }
        else {
            console.log('else');
            console.log(img_src);

            if (img_src) {
                const newCombos = await Combos.insertMany({ title, over_view, img_src, price})
                res.json({ message: 'newCombos added succes to combos section with photo', newCombos })

            }
            else {
                const newCombos = await Combos.insertMany({ title, over_view, price })
                res.json({ message: 'newCombos added succes to combos without photo', newCombos })
            }



        }

    } catch (error) {
        res.json({ message: 'error to add combos', error })

    }

}


const getCombosSec = async (req, res) => {

    try {
        const combosSec = await Combos.find({})
        res.json({ combosSec })

    } catch (error) {
        res.json({ error })

    }
}





module.exports = {
    addToCombosSec,
    getCombosSec

}