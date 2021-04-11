const mongoose = require('mongoose')
const Post = mongoose.model('Post')

exports.index = async (req, res) => {
    let data = {
        posts: [],
        tags: [],
        tag:''
    }

    data.tag = req.query.t
    const postFilter = (typeof data.tag != 'undefined') ? {tags:data.tag} : {}

    const tagsPromisse = Post.getTagsList()
    const postsPromisse = Post.find( postFilter ).populate( 'author' );

    const [ tags, posts ] = await Promise.all([tagsPromisse, postsPromisse])

    for(let i in tags) {
        if(tags[i]._id == data.tag) {
            tags[i].class = "selected"
        }
    }
    data.tags = tags
    data.posts = posts;

    res.render('home', data)
}