
import Comment from '../model/comment.js'

const getAllComments = async(request,response) => {
    console.log(`getAllComments() - id: ${request.params.id }`)
    try {
        const comments = await Comment.find({ postId: request.params.id });
        
        response.status(200).json(comments);
    } catch (error) {
        response.status(500).json(error)
    }
}

const addComment = async (request,response) => {
    console.log(`addComment()`)
    try {
        const comment = new Comment(request.body);
        await comment.save();

        response.status(200).json('Comment saved successfully');
    } catch (error) {
        response.status(500).json(error);
    }
}

const deleteComment = async(request,response) => {
    console.log(`deleteComment() - id: ${request.params.id }`)
    try {
        const comment = await Comment.findByIdAndDelete(request.params.id);
        response.status(200).json('comment deleted successfully');
    } catch (error) {
        response.status(500).json(error)
    }
}
 

export {getAllComments, addComment, deleteComment}