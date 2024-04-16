import { useState, useEffect } from "react";
import HomePosts from "../components/HomePosts";
const URL = process.env.REACT_APP_BACKEND_URL;

export const Home = () => {

    const [posts, setPosts] = useState([]);

    const fetchPosts = async () => {
        try {
            const res = await fetch(`${URL}/api/posts`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await res.json();
            setPosts(data);
            console.log(data);
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div className="px-8 md:px-[200px] min-h-[80vh]">
            {posts.map((post) => (
                <HomePosts key={post._id} post={post} />
            ))}
        </div>
    )
}

export default Home;