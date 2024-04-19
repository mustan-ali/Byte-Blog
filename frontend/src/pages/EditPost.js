import { useState, useContext, useEffect } from 'react'
import { UserContext } from '../context/UserContext';
import { useParams, useNavigate } from 'react-router-dom'
import { ImCross } from 'react-icons/im'
const URL = process.env.REACT_APP_BACKEND_URL;

const EditPost = () => {
    const postId = useParams().id;
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [file, setFile] = useState(null)
    const [category, setCategory] = useState('')
    const [categories, setCategories] = useState([])

    const fetchPost = async () => {
        try {
            const response = await fetch(`${URL}/api/posts/${postId}`);
            const data = await response.json();
            setTitle(data.title);
            setDescription(data.description);
            setFile(data.photo);
            setCategories(data.categories);
        } catch (err) {
            console.log(err);
        }
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        const post = {
            title,
            description,
            username: user.username,
            userId: user._id,
            categories
        }

        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("img", filename);
            data.append("file", file);
            post.photo = filename;

            try {
                await fetch(`${URL}/api/upload`, {
                    method: 'POST',
                    body: data,
                    credentials: 'include'
                });
            } catch (err) {
                console.log(err);
            }
        }

        try {
            const res = await fetch(`${URL}/api/posts/${postId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(post),
                credentials: 'include'
            });
            const data = await res.json();
            navigate(`/post/${data._id}`);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchPost();
        // eslint-disable-next-line
    }, [postId]);

    const addCategory = () => {
        setCategories([...categories, category])
        setCategory('')
    }

    const deleteCategory = (index) => {
        let newCategories = [...categories]
        newCategories.splice(index, 1)
        setCategories(newCategories)
    }

    return (
        <div className='px-6 md:px-[200px] mt-8'>
            <h1 className='font-bold md:text-2xl text-xl '>Update a post</h1>
            <form className='w-full flex flex-col space-y-4 md:space-y-8 mt-4'>
                <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" placeholder='Enter post title' className='px-4 py-2 outline-none' />
                <input onChange={(e) => setFile(e.target.files[0])} type="file" className='px-4' />
                <div className='flex flex-col'>
                    <div className='flex items-center space-x-4 md:space-x-8'>
                        <input value={category} onChange={(e) => setCategory(e.target.value)} className='px-4 py-2 outline-none' placeholder='Enter post category' type="text" />
                        <div onClick={addCategory} className='bg-black text-white px-4 py-2 font-semibold cursor-pointer'>Add</div>
                    </div>
                    {/* categories */}
                    <div className='flex px-4 mt-3'>
                        {categories?.map((c, i) => (
                            <div key={i} className='flex justify-center items-center space-x-2 mr-4 bg-gray-200 px-2 py-1 rounded-md'>
                                <p>{c}</p>
                                <p onClick={() => deleteCategory(i)} className='text-white bg-black rounded-full cursor-pointer p-1 text-sm'><ImCross /></p>
                            </div>
                        ))}
                    </div>
                </div>
                <textarea onChange={(e) => setDescription(e.target.value)} value={description} rows={12} cols={30} className='px-4 py-2 outline-none' placeholder='Enter post description' />
                <button onClick={handleUpdate} className='bg-black w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-2 md:text-xl text-lg'>Update</button>
            </form>
        </div>
    )
}

export default EditPost;