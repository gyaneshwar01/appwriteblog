import React, { useEffect, useState } from "react";
import { Container } from "../components";
import databaseService from "../appwrite/database";
import { useSelector } from "react-redux";
import AllPosts from "./AllPosts";
import { useDispatch } from "react-redux";
import { addPosts } from "../store/postSlice";

function Home() {
  const [posts, setPosts] = useState([]);
  const { status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status)
      databaseService.getPosts().then((posts) => {
        if (posts) {
          setPosts(posts.documents);
          dispatch(addPosts({ posts: posts.documents }));
        }
      });
  }, [status]);

  if (posts.length === 0 || !status) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                Login to read posts
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }
  return <AllPosts />;
}

export default Home;
