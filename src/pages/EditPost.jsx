import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import databaseService from "../appwrite/database";
import { Container, PostForm } from "../components";
import { useNavigate } from "react-router-dom";

function EditPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (slug)
      databaseService.getSinglePost(slug).then((postData) => {
        if (postData) {
          setPost(postData);
        }
        setLoading(false);
      });
  }, [slug, navigate]);

  if (loading) {
    return <h1>Loading Post...</h1>;
  }
  if (post)
    return (
      <div className="py-8">
        <Container>
          <PostForm post={post} />
        </Container>
      </div>
    );
}

export default EditPost;
