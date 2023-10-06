import React, { useState, useEffect } from "react";
import { PostCard, Container } from "../components";
import databaseService from "../appwrite/database";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    databaseService.getPosts().then((postsData) => {
      if (postsData) {
        setPosts(postsData.documents);
        setLoading(false);
      }
    });
  }, []);

  if (loading) {
    return <h1>Loading Posts...</h1>;
  }

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
