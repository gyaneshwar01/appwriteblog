import { PostCard, Container } from "../components";
import { useSelector } from "react-redux";

const AllPosts = () => {
  const { posts } = useSelector((state) => state.post);

  return posts.length > 0 ? (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  ) : (
    <h1>No Posts Created</h1>
  );
};

export default AllPosts;
