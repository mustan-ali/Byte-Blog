import { useContext } from 'react';
import { MdDelete } from 'react-icons/md'
import { UserContext } from '../context/UserContext'
const URL = process.env.REACT_APP_BACKEND_URL;

export const Comment = ({ c }) => {

    const { user } = useContext(UserContext);

    const handleDeleteComment = async () => {
        try {
            const res = await fetch(`${URL}/api/comments/${c._id}`, {
                method: "DELETE",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (res.ok) {
                window.location.reload();
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="px-2 py-2 bg-gray-200 rounded-lg my-2">
            <div className="flex items-center justify-between">
                <h3 className="font-bold text-gray-600">@{c.author}</h3>
                <div className="flex justify-center items-center space-x-4">
                    <p>{new Date(c.updatedAt).toString().slice(0, 15)}</p>
                    <p>{new Date(c.updatedAt).toString().slice(16, 24)}</p>
                    {user?.id === c?.userId ?
                        <div className="flex items-center justify-center space-x-2">
                            <p onClick={handleDeleteComment} className="cursor-pointer"><MdDelete /></p>
                        </div>
                        : ""}
                </div>
            </div>
            <p className="px-4 mt-2">{c.comment}</p>

        </div>
    )
}

export default Comment;