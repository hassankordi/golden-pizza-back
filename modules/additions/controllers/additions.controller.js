const Additions = require("../model/additions.model");




const addToAdditionsSec = async (req, res) => {
    let { title, over_view, smallPrice, largePrice, mediumPrice } = req.body;
    console.log(req.body);
    console.log(req.file);
    let img_src;
    // != undefined
    if (req.file ) {
        
        img_src = `${process.env.BASE_URL}/${req.file.path}`

    }


    console.log('in is controller');
    console.log(img_src);


    try {

        const findAdditions = await Additions.findOne({ title })
        console.log('ti6le');

        if (findAdditions) {
            res.json({ message: 'this title is already exist try another title' })
        }
        else {
            console.log('else');
            console.log(img_src);

            if (img_src) {
                const newAdditions = await Additions.insertMany({ title, over_view, img_src, smallPrice, largePrice, mediumPrice })
                res.json({ message: 'Additions added succes to Additions section with photo', newAdditions })

            }
            else {
                const newAdditions = await Additions.insertMany({ title, over_view, smallPrice, largePrice, mediumPrice })
                res.json({ message: 'Additions added succes to Additions without photo', newAdditions })
            }



        }

    } catch (error) {
        res.json({ message: 'error to add Additions', error })

    }

}


const getAdditionsSec = async (req, res) => {

    try {
        const additionsSec = await Additions.find({})
        res.json({ additionsSec })

    } catch (error) {
        res.json({ error })

    }
}


module.exports ={

    addToAdditionsSec,
    getAdditionsSec
}