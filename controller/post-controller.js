
import Post from '../model/post.js';


const createPost = async (request, response) => {
    console.log("hello from create")
    try {
        const post = new Post(request.body);
        await post.save();

        response.status(200).json('Post saved successfully');
    } catch (error) {
        response.status(500).json(error);
    }
}

 const getAllPosts = async (request, response) => {
    let category = request.query.category;
    console.log(`/posts - ${category}`)
    let posts;
    try {
        if (category) 
            posts = await Post.find({ categories: category });
        else 
            posts = await Post.find({});
            
        response.status(200).json(posts);
    } catch (error) {
        response.status(500).json(error)
    }
}

const getPostById = async (request, response) => {
    try {
        const post = await Post.findById(request.params.id);

        response.status(200).json(post);
    } catch (error) {
        response.status(500).json(error)
    }
}

const updatePostById= async (request, response) => {
    try {
        const post = await Post.findById(request.params.id);

        if (!post) {
            response.status(404).json({ msg: 'Post not found' })
        }
        
        await Post.findByIdAndUpdate( request.params.id, { $set: request.body })

        response.status(200).json('post updated successfully');
    } catch (error) {
        response.status(500).json(error);
    }
}

const deletePostById = async (request, response) => {
    console.log(request.params.id)
    try {
        const post = await Post.findById(request.params.id);
        if (!post) {
            response.status(404).json({ msg: 'Post not found' })
        }
        
        await Post.findByIdAndDelete(request.params.id);
        // await post.remove()

        response.status(200).json('post deleted successfully');
    } catch (error) {
        response.status(500).json(error)
    }
}

export {createPost, getAllPosts, getPostById, updatePostById, deletePostById}