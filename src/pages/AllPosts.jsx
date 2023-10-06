import { useEffect, useState } from "react";
import { PostCard, Container } from "../components";
import { useDispatch } from "react-redux";
import databaseService from "../appwrite/database";
import { addPosts } from "../store/postSlice";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    databaseService.getPosts().then((postData) => {
      setPosts(postData.documents);
      dispatch(addPosts({ posts: postData.documents }));
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <h1>Loading posts...</h1>;
  }

  return posts.length > 0 ? (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post?.$id} className="p-2 w-1/4">
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
