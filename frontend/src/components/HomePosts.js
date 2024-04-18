const URL = process.env.REACT_APP_BACKEND_URL;

export const HomePosts = ({ post }) => {
    return (
        <div className="w-full flex my-8 space-x-4">
            {/* left */}
            <div className="w-[350px] h-[200px] flex justify-center items-center">
                <img src={`${URL}/images/${post.photo}`} alt="" className="h-full w-full object-cover" />
            </div>
            {/* right */}
            <div className="flex flex-col w-[65%]">
                <h1 className="text-xl font-bold md:mb-2 mb-1 md:text-2xl">
                    {post.title}
                </h1>
                <div className="flex mb-2 text-sm font-semibold text-gray-500 items-center justify-between md:mb-4">
                    <p>@{post.username}</p>
                    <div className="flex space-x-2 text-sm">
                        <p>{new Date(post.updatedAt).toString().slice(0, 15)}</p>
                        <p>{new Date(post.updatedAt).toString().slice(16, 21)}</p>
                    </div>
                </div>
                <p className="text-sm ">{post.description.slice(0, 200) + "... Read More"}</p>
            </div>
        </div>
    )
}

export default HomePosts;