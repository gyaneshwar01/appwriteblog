import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Protected({ children, authenticate = true }) {
  const [loading, setLoading] = useState(true);
  const { status } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (authenticate && status !== authenticate) {
      navigate("/login");
    } else if (!authenticate && status !== authenticate) {
      navigate("/");
    }
    setLoading(false);
  }, [status, navigate]);

  return loading ? <h1>Loading...</h1> : <>{children}</>;
}

export default Protected;
