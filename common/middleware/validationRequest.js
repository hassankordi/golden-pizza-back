// const { StatusCodes } = require("http-status-codes")

// module.exports = (schema)=>{
//     return (req , res , next)=>{
//         console.log('hi from validation req');
//         console.log(req.params);
//         let ress = schema.params.validate(req.params)
//         console.log(ress);
//         const validationArr = [];

//         [('headers' , 'params' , 'query' , 'body')].forEach(key =>{
//         console.log('hi from validation req'+key);  

//             if(schema[key]){
//                 const validationResult = schema[key].validate(req[key])
//                 console.log(`validation result =>`);
//                 console.log(`validation result =>${validationResult}`);
//                 if(validationResult.error){
//                     validationArr.push(validationResult.error.details[0].message.split('\"').join() )

//                 }
//             }
//         });
//         if(validationArr.length){
//             res.status(StatusCodes.BAD_REQUEST).json({msg:validationArr.join()})
//         }
//         else{
//             next();
//         }
//     }
// }



const { StatusCodes } = require("http-status-codes")


module.exports = (Schema) => {
    return (req, res, next) => {
        const validations = [];
        // console.log('before each');
        [('headers', 'params', 'query', 'body')].forEach(key => {
        // console.log('after each');
        console.log(key);

            if (Schema[key]) {
        // console.log('before each');

                const validation = Schema[key].validate(req[key])
                if (validation.error) {
                    validations.push(validation.error.details[0].message.split('\"').join())

                }
            }
        });
        if (validations.length) {
            res.status(StatusCodes.BAD_REQUEST).json({ message: validations.join() })
        } else {
            next();
        }
    }
}
