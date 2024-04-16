import { useContext } from 'react';
import { BiEdit } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md'
import { UserContext } from '../context/UserContext'

export const Comment = ({ comment }) => {

    const { user } = useContext(UserContext);

    return (
        <div className="px-2 py-2 bg-gray-200 rounded-lg my-2">
            <div className="flex items-center justify-between">
                <h3 className="font-bold text-gray-600">@{comment.author}</h3>
                <div className="flex justify-center items-center space-x-4">
                    <p>{new Date(comment.updatedAt).toString().slice(0, 15)}</p>
                    <p>{new Date(comment.updatedAt).toString().slice(16, 24)}</p>
                    {user?._id === comment.userId && (
                        <div className="flex items-center justify-center space-x-2">
                            <p className="cursor-pointer"><BiEdit /></p>
                            <p className="cursor-pointer"><MdDelete /></p>
                        </div>
                    )}
                </div>
            </div>
            <p className="px-4 mt-2">lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates.</p>
        </div>
    )
}

export default Comment;