import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import HomePosts from "../components/HomePosts";
const URL = process.env.REACT_APP_BACKEND_URL;
export const Home = () => {

    const [posts, setPosts] = useState([]);
    const { search } = useLocation()

    const fetchPosts = async () => {
        try {
            const res = await fetch(`${URL}/api/posts` + search, {
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
    }, [search]);

    return (
        <div className="px-8 md:px-[200px] min-h-[80vh]">
            {posts.map((post) => (
                <Link to={`/post/${post._id}`} key={post._id}>
                    <HomePosts key={post._id} post={post} />
                </Link>
            ))}
        </div>
    )
}

export default Home;