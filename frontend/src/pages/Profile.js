import { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate, Link } from "react-router-dom";
import HomePosts from "../components/HomePosts";
const URL = process.env.REACT_APP_BACKEND_URL;

export const Profile = () => {

    const { user, setUser } = useContext(UserContext);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [posts, setPosts] = useState([]);

    const fetchUserDetails = async () => {
        try {
            if (user?.id) {
                const res = await fetch(`${URL}/api/users/` + user.id, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const data = await res.json();
                setUsername(data.username);
                setEmail(data.email);
            }
        }
        catch (err) {
            console.error(err);
        }
    }

    const handleUpdate = async () => {
        try {
            if (user?.id) {
                await fetch(`${URL}/api/users/` + user.id, {
                    method: "PUT",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username,
                        email,
                        password,
                    }),
                });
            }
        }
        catch (err) {
            console.error(err);
        }
    }

    const handleDelete = async () => {
        try {
            if (user?.id) {
                await fetch(`${URL}/api/users/` + user.id, {
                    method: "DELETE",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
            }
            setUser(null);
            Navigate("/");
        }
        catch (err) {
            console.error(err);
        }
    }

    const fetchUserPosts = async () => {
        try {
            if (user?.id) {
                const res = await fetch(`${URL}/api/posts/user/` + user.id, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const data = await res.json();
                setPosts(data);
            }
        }
        catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        fetchUserDetails();
        fetchUserPosts();
        // eslint-disable-next-line
    }, [user?.id]);

    return (
        <div className="min-h-[80vh] px-8 md:px-[200px] mt-8 flex md:flex-row flex-col-reverse md:items-start items-start">
            <div className="flex flex-col md:w-[70%] w-full mt-8 md:mt-0">
                <h1 className="text-xl font-bold mb-4">Your posts:</h1>
                {posts?.map((p) => (
                    <Link to={`/post/${p._id}`} key={p._id}>
                        <HomePosts key={p._id} post={p} />
                    </Link>
                ))}
            </div>
            <div className="md:sticky md:top-12  flex justify-start md:justify-end items-start md:w-[30%] w-full md:items-end ">
                <div className=" flex flex-col space-y-4 items-start">
                    <h1 className="text-xl font-bold mb-4">Profile</h1>
                    <input readOnly value={username} onChange={(e) => setUsername(e.target.value)} className="outline-none px-4 py-2 text-gray-500" placeholder="Your username" type="text" />
                    <input readOnly value={email} onChange={(e) => setEmail(e.target.value)} className="outline-none px-4 py-2 text-gray-500" placeholder="Your email" type="email" />
                    <input onChange={(e) => setPassword(e.target.value)} className="outline-none px-4 py-2 text-gray-500" placeholder="New password" type="password" />
                    <div className="flex items-center space-x-4 mt-8">
                        <button onClick={handleUpdate} className="text-white font-semibold bg-black px-4 py-2 hover:text-black hover:bg-gray-400">Update</button>
                        <button onClick={handleDelete} className="text-white font-semibold bg-black px-4 py-2 hover:text-black hover:bg-gray-400">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;