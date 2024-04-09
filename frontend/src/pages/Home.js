import HomePosts from "../components/HomePosts";

export const Home = () => {
    return (
        <div className="px-8 md:px-[200px] min-h-[80vh]">
            <HomePosts />
            <HomePosts />
            <HomePosts />
        </div>
    )
}

export default Home;