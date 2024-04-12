export const ProfilePost = () => {
    return (
        <div className="w-full flex my-8 space-x-4">
            {/* left */}
            <div className="w-[350px] h-[200px] flex justify-center items-center">
                <img src="https://images.unsplash.com/photo-1569396116180-7fe09fa16dd8?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className="h-full w-full object-cover" />
            </div>
            {/* right */}
            <div className="flex flex-col w-[65%]">
                <h1 className="text-xl font-bold md:mb-2 mb-1 md:text-2xl">
                    Test Title
                </h1>
                <div className="flex mb-2 text-sm font-semibold text-gray-500 items-center justify-between md:mb-4">
                    <p>@Username</p>
                    <div className="flex space-x-2 text-sm">
                        <p>01/01/2024</p>
                        <p>12:00</p>
                    </div>
                </div>
                <p className="text-sm ">lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates.</p>
            </div>
        </div>
    )
}

export default ProfilePost;