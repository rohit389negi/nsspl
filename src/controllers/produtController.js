const productModel = require('../models/productModel')

const isValidRequestBody = function(value){
    return Object.keys(value).length > 0
}

function maxElem(arr) {
    let maxElement = arr[0];
    for (let i = 0; i < arr.length; i++) {
    if (maxElement < arr[i]) {
    maxElement = arr[i]
    }
    }
    return maxElement;
    }

const createProduct = async function(req,res){
    try{        
        const requestBody = req.body
        if(!isValidRequestBody(requestBody)){
            return res.status(400).send({status:false, message:'requested body not found'})
        }
        const productData = await productModel.create(requestBody)
        return res.status(201).send({status: true, message:'Product added successfully', data:productData})
    }
    catch(err){
        return res.status(500).send({status: false, message: err.message})
    }
}

const getProduct = async function(req,res){
    try{
        const requestBody = req.body
        const {productId} = requestBody 

        if(!isValidRequestBody(requestBody)){
            return res.status(400).send({status:false, message:'requested body not found'})
        }
        const filterProduct = await productModel.find({tagSpecial:true})     

        let obj = {}

        let ifFound = filterProduct.find(el=>el.productId==productId)
        if(!ifFound){
            return res.status(400).send({status:false, message:'product not available or tagSpecial is false'})
        }
        obj.countTagSpecial = filterProduct.length-1            
        
        let ratings = []

        filterProduct.forEach(el=>{
            if(el.productId != productId)
            ratings.push(el.rating) 
        })
        obj.maxRating = maxElem(ratings)

        return res.status(200).send({status:true, message:'successfully fetched product', data:obj})
    }
    catch(err){
        return res.status(500).send({status:false, message: err.message})
    }
}


const updateProduct = async function(req,res){
    try{
        const requestBody = req.body
        const {productId, year, tagId} = requestBody
        
        const product = await productModel.findOne({productId})
        
        let flag = 0
        for(let i in product.tagging){ 
            if(product.tagging[i].year == year){
                product.tagging[i].tagId = tagId
                flag = 1
                break
            }
        }
        if(flag == 0){
        product.tagging.push({year:year, tagId:tagId})
        }
        const update = await productModel.findOneAndUpdate({productId}, product, {new:true})
        return res.status(200).send({status:true, message:'product updated successfully', data:update})
    }
    catch(err){
        return res.status(500).send({status:false, message: err.message})
    }
}

const deleteTag = async function(req,res){
    try{
        const requestBody = req.body
        const {productId, year} = requestBody
        
        const delTag = await productModel.findOne({productId})        
        let leftTags = []
        for(let i in delTag.tagging){ 
            if(delTag.tagging[i].year <= year ){
                leftTags.push(delTag.tagging[i])
            }
        }
        const deleteTagging = await productModel.findOneAndUpdate({productId}, {tagging:leftTags}, {new:true})
        return res.status(200).send({status:true, message:'product updated', data:deleteTagging})
    }
    catch(err){
        return res.status(500).send({status:false, message: err.message})
    }
}

module.exports = {createProduct, getProduct, updateProduct, deleteTag}
