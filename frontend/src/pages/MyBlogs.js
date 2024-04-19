import { useState, useContext, useEffect } from "react";
import { UserContext } from '../context/UserContext';
import { Link } from "react-router-dom";
import HomePosts from "../components/HomePosts";
const URL = process.env.REACT_APP_BACKEND_URL;

export const MyBlogs = () => {

    const { user } = useContext(UserContext);
    const [posts, setPosts] = useState([]);

    const fetchPosts = async () => {
        try {
            const res = await fetch(`${URL}/api/posts/user/${user.id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await res.json();
            setPosts(data);
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchPosts();
        // eslint-disable-next-line
    }, []);


    return (
        <div className="px-8 md:px-[200px] min-h-[80vh]">
            {posts.length !== 0 ?
                posts.map((post) => (
                    <Link to={user ? `/posts/post/${post._id}` : "/login"}>
                        <HomePosts key={post._id} post={post} />
                    </Link>
                )) : <h3 className="text-center font-bold mt-16">No posts available</h3>}
        </div>
    )
}

export default MyBlogs;
