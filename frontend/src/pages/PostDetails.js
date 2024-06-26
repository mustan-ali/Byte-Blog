import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import { BiEdit } from 'react-icons/bi'
import { MdDelete } from 'react-icons/md'
import Comment from '../components/Comment'
import { UserContext } from '../context/UserContext'
const URL = process.env.REACT_APP_BACKEND_URL;

export const PostDetails = () => {

    const Navigate = useNavigate();
    const { id } = useParams();
    const { user } = useContext(UserContext);
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');

    const fetchPost = async () => {
        try {
            const res = await fetch(`${URL}/api/posts/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await res.json();
            setPost(data);
        }
        catch (error) {
            console.log(error);
        }
    }

    const fetchComments = async () => {
        try {
            const res = await fetch(`${URL}/api/comments/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await res.json();
            setComments(data);
        }
        catch (error) {
            console.log(error);
        }
    }

    const handleDeletePost = async () => {
        try {
            const res = await fetch(`${URL}/api/posts/${id}`, {
                method: "DELETE",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (res.ok) {
                Navigate("/");
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    const handleNewComment = async () => {
        const newComment = {
            comment,
            author: user.username,
            postId: id,
            userId: user.id
        }

        try {
            const res = await fetch(`${URL}/api/comments/create`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newComment),
            });

            if (res.ok) {
                setComment('');
                fetchComments();
                Navigate("/post/" + id);
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchPost();
        fetchComments();
        // eslint-disable-next-line
    }, [id]);

    return (
        <div>
            <div className="px-8 md:px-[200px] mt-8">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-black md:text-3xl">{post.title}</h1>
                    {user?.id === post.userId && (
                        <div className="flex items-center justify-center space-x-2">
                            <p onClick={() => Navigate("/edit/" + id)} className="cursor-pointer"><BiEdit /></p>
                            <p onClick={handleDeletePost} className="cursor-pointer"><MdDelete /></p>
                        </div>
                    )}
                </div>
                <div className="flex items-center justify-between mt-2 md:mt-4">
                    <p>@{post.username}</p>
                    <div className="flex space-x-2">
                        <p>{new Date(post.updatedAt).toString().slice(0, 15)}</p>
                        <p>{new Date(post.updatedAt).toString().slice(16, 21)}</p>
                    </div>
                </div>
                <img src={`${URL}/images/${post.photo}`} className="w-full  mx-auto mt-8" alt="" />
                <p className="mx-auto mt-8">{post.description}</p>
                <div className="flex items-center mt-8 space-x-4 font-semibold">
                    <p>Categories:</p>
                    <div className="flex justify-center items-center space-x-2">
                        {post.categories?.map((c, i) => (
                            <div key={i} className="bg-gray-300 rounded-lg px-3 py-1">{c}</div>
                        ))}
                    </div>
                </div>

                {/* comments */}
                {Array.isArray(comments) && comments.map((c) => (
                    <Comment key={c._id} c={c} post={post} />
                ))}

                {/* write a comment */}
                <div className="w-full flex flex-col mt-12 md:flex-row">
                    <input onChange={(e) => setComment(e.target.value)} type="text" placeholder="Write a comment" className="md:w-[80%] outline-none py-2 px-4 mt-4 md:mt-0" />
                    <button onClick={handleNewComment} className="bg-black text-sm text-white px-2 py-2 md:w-[20%] mt-4 md:mt-0">Add Comment</button>
                </div>
            </div>
        </div>
    )
}

export default PostDetails;