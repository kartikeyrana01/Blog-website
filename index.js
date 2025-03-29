const express =require('express');
const { cp } = require('fs');
const app = express();
const port = 8080;
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');
app.use(methodOverride('_method'));



app.use(express.urlencoded({extended: true}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

let posts =[
    {
        id : uuidv4(),
        username : 'kartikey',
        content : 'This is my first post'
    },{
        id :uuidv4(),
        username : 'preet',
        content : 'This is my second post'
    },{
        id :uuidv4(),
        username : 'karpreet',
        content : 'This is my third post',
    }
] 

app.get('/posts', (req, res) => {
  res.render('index.ejs', { posts });
});

app.get('/posts/new', (req, res) => {
  res.render('new.ejs');
});

// 
app.post('/posts', (req, res) => {
    const { username, content } = req.body;
    let id = uuidv4();
    posts.push({ id , username, content });
    res.redirect('/posts');
    });

app.get('/posts/:id', (req, res) => {
const{id} = req.params;
let post = posts.find((p) => id === p.id);
res.render('show', {post});
});

app.patch('/posts/:id', (req, res) => {
  let { id } = req.params;
  let newContent = req.body.content;
  let post = posts.find((p) => p.id === id);
  post.content = newContent;
  console.log(post);
 res.redirect('/posts');
});

app.get('/posts/:id/edit', (req, res) => {
  let { id } = req.params;
  let post = posts.find((post) => id === post.id);
  res.render('edit', { post });

});

app.delete('/post/:id', (req, res) => {
  let { id } = req.params;
  posts = posts.filter((p) => p.id !== id); // Reassign the filtered array to posts
  res.redirect('/posts');
});


app.listen(port, () => {
  console.log('Server is running at port 8080');
});