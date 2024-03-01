const User = require("../models/user");
const Post = require('../models/post')
const TokenGenerator = require("../models/token_generator");

const PostController = {

    Index: async (req, res) => {
        const user = await User.findById(req.user_id);
    
        Post.find()
          .populate({
            path: "user",
            select: "firstName",
          })
          .exec(async (err, posts) => {
            const token = await TokenGenerator.jsonwebtoken(req.user_id);
            res.locals.user_id = req.user_id;
            res
              .status(200)
              .json({ posts: posts, user: user, token: token });
          });
    },

    Create: async (req,res)=>{
        try{
            const newPost=new Post(req.body)
            // console.log(req.body)
            const savedPost = await newPost.save()
            
            res.status(200).json(savedPost)
        }
        catch(err){
            
            res.status(500).json(err)
        }
        
    },

    Update: async (req,res)=>{
        try{
           
            const updatedPost=await Post.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
            res.status(200).json(updatedPost)
    
        }
        catch(err){
            res.status(500).json(err)
        }
    },

    Delete: async (req,res)=>{
        try{
            await Post.findByIdAndDelete(req.params.id)
            res.status(200).json("Post has been deleted!")
    
        }
        catch(err){
            res.status(500).json(err)
        }
    },

    Get: async (req,res)=>{
        const query=req.query
        
        try{
            const searchFilter={
                title:{$regex:query.search, $options:"i"}
            }
            const posts=await Post.find(query.search?searchFilter:null)
            res.status(200).json(posts)
        }
        catch(err){
            res.status(500).json(err)
        }
    },

    GetPostDetails: async (req,res)=>{
        try{
            const post=await Post.findById(req.params.id)
            res.status(200).json(post)
        }
        catch(err){
            res.status(500).json(err)
        }
    }

}

module.exports = PostController;