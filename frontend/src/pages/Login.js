import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from '../context/UserContext';
const URL = process.env.REACT_APP_BACKEND_URL;

export const Login = () => {

    const Navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const { setUser } = useContext(UserContext);

    const handleLogin = async () => {
        try {
            const res = await fetch(`${URL}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();
            if (data.status !== 200) {
                setError(true);
            } else if (data.status === 200) {
                setUser(data);
                setError(false);
                setEmail("");
                setPassword("");
                Navigate("/");
            }
        } catch (err) {
            setError(true);
            console.log(err);
        }
    }

    return (
        <div className="w-full flex justify-center items-center h-[80vh] ">
            <div className="flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%]">
                <h1 className="text-xl font-bold text-left">Log in to your account</h1>
                <input onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 border-2 border-black outline-0" type="text" placeholder="Enter your email" />
                <input onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2 border-2 border-black outline-0" type="password" placeholder="Enter your password" />
                <button onClick={handleLogin} className="w-full px-4 py-4 text-lg font-bold text-white bg-black rounded-lg hover:bg-gray-500 hover:text-black ">Log in</button>
                {error && <h3 className="text-red-500 text-sm ">Something went Wrong</h3>}
                <div className="flex justify-center items-center space-x-3">
                    <p>New here?</p>
                    <p className="text-gray-500 hover:text-black"><Link to="/register">Register</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Login;