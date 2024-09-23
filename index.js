const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require("method-override");

app.use(methodOverride('_method'));

app.use(express.urlencoded({extended:true}));

app.use(express.static('.'));
app.set("view engine", "ejs");
let posts = [
    {
        id : uuidv4(),
        username : "Prajyot",
        content : "I love CODING",
    },
    {
        id : uuidv4(),
        username : "Raghav",
        content : "I love playing",
    },

    {
        id : uuidv4(),
        username : "Laptop",
        content : "I love processing",
    },
];

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})

app.get("/posts/new",(req,res)=>{
    id = uuidv4();
    res.render("new.ejs", {id})
})

app.post("/posts",(req,res)=>{
    let {username, content} = req.body;
    let id = uuidv4();
    posts.push({username, content, id});
    // console.log(req.body);
    res.redirect("/posts");
})

app.get("/posts/:id", (req,res)=>{
    let {id} = req.params;
    let post = posts.find(p => p.id === id);
    console.log(post);
    if(post){
        res.render("show.ejs",{ post});
    }
    else{
        res.send("Post not found!");
    } 
    // res.send("Request Working");
})

app.patch("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let newContent = req.body.content;
    //console.log(newContent);
    let post = posts.find((p)=> id === p.id);
    //console.log(post);  {before assigning newContent to post.content}
    post.content = newContent;
    //console.log(post);  {after assigning newContent to post.content}
    res.redirect("/posts");
})

app.get("/posts/:id/edit", (req,res)=> {
    let { id } = req.params;
    let post = posts.find(p => p.id === id);
    res.render("edit.ejs", {post});
})

app.get("/",(req,res)=>{
    res.send("Server working well!!!");
})

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{ posts });
})

app.delete("/posts/:id",(req,res)=>{
    let {id} = req.params;
    posts = posts.filter(p => p.id !== id);
    res.redirect("/posts");
})