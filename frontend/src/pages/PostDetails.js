import { BiEdit } from 'react-icons/bi'
import { MdDelete } from 'react-icons/md'
import Comment from '../components/Comment'

export const PostDetails = () => {
    return (
        <div>
            <div className="px-8 md:px-[200px] mt-8">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-black md:text-3xl">Test Title</h1>
                    <div className="flex items-center justify-center space-x-2">
                        <p className="cursor-pointer"><BiEdit /></p>
                        <p className="cursor-pointer"><MdDelete /></p>
                    </div>
                </div>
                <div className="flex items-center justify-between mt-2 md:mt-4">
                    <p>@Username</p>
                    <div className="flex space-x-2">
                        <p>01/01/2024</p>
                        <p>12:00</p>
                    </div>
                </div>
                <img src="https://images.unsplash.com/photo-1569396116180-7fe09fa16dd8?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="w-full  mx-auto mt-8" alt="" />
                <p className="mx-auto mt-8">lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates.</p>
                <div className="flex items-center mt-8 space-x-4 font-semibold">
                    <p>Categories:</p>
                    <div className="flex justify-center items-center space-x-2">
                        <div className="bg-gray-300 rounded-lg px-3 py-1">Tech</div>
                        <div className="bg-gray-300 rounded-lg px-3 py-1">Tech</div>
                    </div>
                </div>

                {/* comments */}
                <Comment />
                <Comment />

                {/* write a comment */}
                <div className="w-full flex flex-col mt-4 md:flex-row">
                    <input type="text" placeholder="Write a comment" className="md:w-[80%] outline-none py-2 px-4 mt-4 md:mt-0" />
                    <button className="bg-black text-sm text-white px-2 py-2 md:w-[20%] mt-4 md:mt-0">Add Comment</button>
                </div>
            </div>
        </div>
    )
}

export default PostDetails;