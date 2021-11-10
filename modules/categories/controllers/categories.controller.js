const Categories = require('../model/categories.model')

const Pizza = require('../../pizza/model/pizza.model')
const Deals = require('../../deals/model/deals.model')
const Additions = require('../../additions/model/additions.model')
const Combos = require('../../combos/model/combos.model')
const Specialty = require('../../speciality/model/speciality.model')

const getAllCategories = async (req, res) => {

    // const allCategories = {}
    try {
        console.log('try');
        // const myCategories =  Categories.find({}).cursor()
        // console.log('after cat');
        // for(let doc = await cursor.next() ; doc != null ; doc = await cursor.next()){
        // console.log('in for');

        //     const pizzas = await Pizza.find({})
        //     console.log(pizzas);

        //     const obj = {...doc._doc , pizzas}
        //     allCategories.push(obj)
        // }
        const pizza = await Pizza.find({})
        const deals = await Deals.find({})
        const additions = await Additions.find({})
        const combos = await Combos.find({})
        const specialty = await Specialty.find({})

        // i want categories to ba an array of objects
        // const pizzaObj= pizzas[0]
        // const dealsObj= deals[0]
        // const additionsObj= additions[0]
        // const combosObj= combos[0]
        // const specialtyObj= specialty[0]

        // allCategories.push(pizzas)
        // allCategories.push(deals)
        // allCategories.push(additions)
        // allCategories.push(combos)
        // allCategories.push(specialty)

        const allCategories = {
            pizza,
            deals,
            additions,
            combos,
            specialty

        }



        res.json({ allCategories })

    } catch (error) {
        res.json({ error })

    }
}

const updateItem = async (req, res) => {
    console.log('in update');
    let { id } = req.body;
    console.log(id);

    let { title, over_view, smallPrice, largePrice, mediumPrice } = req.body;
    console.log(req.body);
    console.log(req.file);
    let img_src;
    // != undefined
    if (req.file) {

        img_src = `${process.env.BASE_URL}/${req.file.path}`

    }


    console.log('in is controller');
    console.log(img_src);

    try {
        const pizza = await Pizza.findOne({ _id: id })
        const deals = await Deals.findOne({ _id: id })
        const additions = await Additions.findOne({ _id: id })
        const combos = await Combos.findOne({ _id: id })
        const specialty = await Specialty.findOne({ _id: id })

        if (pizza) {
            if (img_src) {
                await Pizza.updateOne({ _id: id }, { img_src, title, over_view, smallPrice, largePrice, mediumPrice })
                res.json({ message: 'this product updated success with photo' })
            } else {
                await Pizza.updateOne({ _id: id }, { title, over_view, smallPrice, largePrice, mediumPrice })
                res.json({ message: 'this product updated success with out photo' })

            }

        }
        else if (deals) {
            await Deals.updateOne({ _id: id }, { over_view, price: smallPrice })
            res.json({ message: 'this product updated success' })


        }
        else if (combos) {
            if (img_src) {
                await Combos.updateOne({ _id: id }, { img_src, title, over_view, price: smallPrice })
                res.json({ message: 'this product updated success with photo' })
            } else {
                await Combos.updateOne({ _id: id }, { title, over_view, price: smallPrice })
                res.json({ message: 'this product updated success' })

            }


        }
        else if (additions) {

            if (img_src) {
                await Additions.updateOne({ _id: id }, { img_src, title, over_view, smallPrice, largePrice, mediumPrice })
                res.json({ message: 'this product updated success with photo' })
            } else {
                await Additions.updateOne({ _id: id }, { title, over_view, smallPrice, largePrice, mediumPrice })
                res.json({ message: 'this product updated success with out photo' })

            }
           
        }
        else if (specialty) {
            if (img_src) {
                await Specialty.updateOne({ _id: id }, { img_src, title, over_view, smallPrice, largePrice, mediumPrice })
                res.json({ message: 'this product updated success with photo' })
            } else {
                await Specialty.updateOne({ _id: id }, { title, over_view, smallPrice, largePrice, mediumPrice })
                res.json({ message: 'this product updated success with out photo' })

            }
           
        }
        else {
            res.json({ message: 'this product is not here' })
        }



    } catch (error) {
        res.json({ error })

    }
}

const deleteItem = async (req, res) => {
    console.log('in delete');
    let { id } = req.body
    console.log(id);

    try {
        const pizza = await Pizza.findOne({ _id: id })
        const deals = await Deals.findOne({ _id: id })
        const additions = await Additions.findOne({ _id: id })
        const combos = await Combos.findOne({ _id: id })
        const specialty = await Specialty.findOne({ _id: id })

        if (pizza) {
            await Pizza.deleteOne({ _id: id })
            res.json({ message: 'this product deleted success' })
        }
        else if (deals) {
            await Deals.deleteOne({ _id: id })
            res.json({ message: 'this product deleted success' })
        }
        else if (combos) {
            await Combos.deleteOne({ _id: id })
            res.json({ message: 'this product deleted success' })
        }
        else if (additions) {
            await Additions.deleteOne({ _id: id })
            res.json({ message: 'this product deleted success' })
        }
        else if (specialty) {
            await Specialty.deleteOne({ _id: id })
            res.json({ message: 'this product deleted success' })
        }
        else {
            res.json({ message: 'this product is not here' })
        }



    } catch (error) {
        res.json({ error })

    }
}

module.exports = {
    getAllCategories,
    deleteItem ,
    updateItem
}