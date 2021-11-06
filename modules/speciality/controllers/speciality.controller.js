const Speciality = require('../model/speciality.model')


const addToSpecialitySec = async (req, res) => {
    let { title, over_view, smallPrice, largePrice, mediumPrice } = req.body;
    console.log(req.body);
    console.log(req.file);
    let img_src ='';
    if (req.file != undefined) {
        // img_src = req.file.path
        img_src = `${process.env.BASE_URL}/${req.file.path}`

    }


    console.log('in is controller');
    console.log(img_src);


    try {

        const findPizza = await Speciality.findOne({ title })
        console.log('ti6le');

        if (findPizza) {
            res.json({ message: 'this title is already exist try another title' })
        }
        else {
            console.log('else');

            if (img_src) {
                const newPizza = await Speciality.insertMany({ title, over_view, img_src, smallPrice, largePrice, mediumPrice })
                res.json({ message: 'pizza added succes to specialitySec section with photo', newPizza })

            }
            else {
                const newPizza = await Speciality.insertMany({ title, over_view, smallPrice, largePrice, mediumPrice })
                res.json({ message: 'pizza added succes to specialitySec without photo', newPizza })
            }



        }

    } catch (error) {
        res.json({ message: 'error to add pizza in specialitySec', error })

    }

}


const getSpecialitySec = async (req, res) => {

    try {
        const specialitySec = await Speciality.find({})
        res.json({ specialitySec })

    } catch (error) {
        res.json({ error })

    }
}





module.exports = {
    addToSpecialitySec,
    getSpecialitySec

}