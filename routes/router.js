import express from 'express'
import {signup, login} from '../controller/user-controller.js'
import {createPost, getAllPosts, getPostById, updatePostById, deletePostById} from '../controller/post-controller.js';
import { authenticateToken } from '../controller/jwt-controller.js';
import {getAllComments, addComment, deleteComment} from "../controller/comment-controller.js"
const router = express.Router();


router.post("/signup", signup);
router.post("/login", login);
router.post("/create",authenticateToken, createPost);
router.get("/posts",authenticateToken,getAllPosts)
router.get("/getPostById/:id",authenticateToken,getPostById)
router.put("/updatePostById/:id",authenticateToken,updatePostById)
router.delete("/deletePostById/:id",deletePostById)
router.get("/comments/:id",authenticateToken,getAllComments)
router.post("/comment", authenticateToken, addComment)
router.delete("/comment/:id", authenticateToken, deleteComment)

export default router;