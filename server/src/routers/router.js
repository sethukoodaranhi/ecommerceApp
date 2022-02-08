const express=require('express')
const router=express.Router()
const bcryptjs=require('bcryptjs')
const logindb=require('../models/login')
const regdb=require('../models/register')
const jwt=require('jsonwebtoken')
const Addproducts=require('../models/products')
const multer=require('multer')
router.post('/add',(req,res)=>{
  bcryptjs.hash(req.body.password,10,(error,hashval)=>{
        console.log(hashval)
        const data={
            username:req.body.username,
            password:hashval,
            role:req.body.role
        }
        const logindata=logindb(data)
        logindata.save().then((response)=>{
            console.log(response)
            logindb.findOne({username:req.body.username}).then((response)=>{
                console.log(response)
                const id=response._id
                let regdata={
                    loginid:id,
                    usname:req.body.usname,
                    email:req.body.email,
                    mob:req.body.mob,
                    sex:req.body.sex
                }
                var regitems=regdb(regdata)
                regitems.save().then((response)=>{
                    console.log("data from server"+ response)
                    res.status(200).json({
                       detail:response
                    })
                })
            })
        })
    })
    
})
router.post('/logn',(req,res)=>{    
    let fetchuser
    logindb.findOne({username:req.body.username})
    .then((response)=>{
        console.log(response)
        if(!response){
            
            res.json({
                message:"Username not found.."
                
            })
        }
        fetchuser=response
        
        return bcryptjs.compare(req.body.password,response.password)
        
    }).then((response)=>{
        if(!response){
            res.json({
                message:"check your password.."
            })
        }
        else{
            res.json({
                message:"login successfully.",
                data:fetchuser
            })
        }
        const id=fetchuser._id
        regdb.findOne({loginid:id}).then((response)=>{
            const token=jwt.sign({username:fetchuser.username,userid:fetchuser._id},"eshopyuser")
            console.log(token)
            
        })
    })
    
})

const storage=multer.diskStorage({
    destination: function(req,file,callback){
        callback(null,'../client/public/upload')
    },
    filename: function(req,file,callback){
        callback(null,req.body.name)
    }
})
 var upload=multer({storage:storage})
router.post('/upload',upload.single("file"),(req,res)=>{
   return res.json(
       "file uploaded..") 
})


router.post('/adproduct',(req,res)=>{
    const items={
        pname:req.body.pname,
        price:req.body.price,
        image:req.body.image
    }
    const pitems=Addproducts(items)
    pitems.save().then((response)=>{
        console.log(response)
        res.json({
            data:response
        })
    })
})
router.get('/pview',(req,res)=>{
    Addproducts.find().then((response)=>{
        // console.log("products from server"+ response)
        res.json({
            data:response
        })
   })
})
router.get('/edit/:id',(req,res)=>{
    const id=req.params.id
    Addproducts.findById(id).then((response)=>{
        console.log(response)
        res.json({
            data:response
        })
    })
})
router.post('/editted/:id',(req,res)=>{
    const  id=req.params.id
    const items={
        pname:req.body.pname,
        price:req.body.price,
        image:req.body.image
    }
    Addproducts.findByIdAndUpdate(id,items).then((response)=>{
        console.log("editted"+response)
        res.json({
            data:response
        })
    })
})
router.get('/delete/:id',(req,res)=>{
    const id=req.params.id
    Addproducts.findByIdAndDelete(id).then((response)=>{
        console.log(response)
        res.json({
            data:response
        })
    })
        
})
module.exports=router