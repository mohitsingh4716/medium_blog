import { BlogCard } from "../components/BlogCard";
import { useUserPost } from "../hooks/useUserPost";
import { BlogLoading } from "../Loadings/BlogLoading";
import { Appbar } from "../components/Appbar";
import { ScrollToTopButton } from "../components/ScrollToTopButton";


export const UserPost = () => {

    const { loading, posts } = useUserPost();

    if (loading) {
        return <div>
            <BlogLoading />
        </div>
    }

    return <div>
        <Appbar />
        <div className="flex justify-center">
            <div className=" max-w-xl mt-16">

                {/* {JSON.stringify(posts[0])} */}

                {posts.slice()
                    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                    .map(post => <BlogCard
                        key={post.id}
                        id={post.id}
                        title={post.title}
                        content={post.content}
                        firstImgUrl={post.image}
                        publishedDate={post.createdAt.toString()}
                        authorName={post.author.name}
                        description={post.author.description} />)}
            </div>
        </div>
        <ScrollToTopButton />
    </div>
}

