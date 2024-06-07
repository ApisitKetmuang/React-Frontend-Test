import React, { useRef } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";

import { Card, Container } from "@mui/material";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Paper from "@mui/material/Paper";
import { red, green, indigo, blue } from "@mui/material/colors";
import Divider from "@mui/material/Divider";
import Pagination from "@mui/material/Pagination";

import Nav from "../components/Nav";

import toast from 'react-hot-toast';

const Draft = () => {
  const baseUrl = "http://dev.opensource-technology.com:3000";
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false)

  async function fetchData(page, signal) {
    try {
      setIsLoading(true)
      const res = await axios.get(`${baseUrl}/api/posts/draft?page=${page}&limit=10`,{signal});
      setPosts(res.data.posts);
      setTotalPages(res.data.total_page);
      setIsLoading(false)
    } catch (error) {
      if (error.message === 'canceled') {
        console.log("Abort draft page");
      } else {
        console.log("error", error.response.data);
      }
    }
  }
  
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal
    fetchData(page, signal);
    return() => {
      controller.abort()
    }
  }, [page]);

  async function handlePublished(id) {
    try {
      await axios.patch(`${baseUrl}/api/posts/${id}`, { published: true });
      toast.success("Post published", { duration: 3000 });
      navigate("/");
    } catch (error) {
      console.log(error.response.data);
    }
  }

  async function handleDelete(id) {
    try {
      await axios.delete(`${baseUrl}/api/posts/${id}`);
      fetchData();
      toast.error("Post deleted", { duration: 3000 });
    } catch (error) {
      console.log(error.response.data);
    }
  }

  function handlePagination(_event, currentPage) {
    setPage(currentPage);
  }

  return (
    <Container
      maxWidth="md"
      sx={{ padding: 4 }}
      style={{ backgroundColor: indigo[100] }}
    >
      <Nav />
      <Paper sx={{ padding: 2 }} style={{ backgroundColor: indigo[50] }}>
        {isLoading && (
          <Container sx={{ width: "fit-content" }}>Loading...</Container>
        )}
        {posts.map((post, index) => (
          <Card key={index} sx={{ m: 2, maxWidth: 780 }}>
            <CardContent>
              <Typography variant="h5">{post.title}</Typography>

              <Typography sx={{ pt: 2 }} variant="body2" color="text.secondary">
                {post.content}
              </Typography>
            </CardContent>

            <Divider variant="middle" sx={{ mb: 1 }} />

            <CardActions>
              <Typography
                sx={{ width: "100%", m: 1 }}
                gutterBottom
                variant="h7"
                color="text.primary"
              >
                {moment(post.created_at).format("DD/MM/YYYY HH:mm")}
              </Typography>

              <Link to={`/edit/${post.id}`}>
                <Button
                  sx={{ flexShrink: 0 }}
                  variant="contained"
                  m={2}
                  style={{ backgroundColor: blue[400] }}
                >
                  Edit
                </Button>
              </Link>

              <Button
                sx={{ px: 3 }}
                variant="contained"
                style={{ backgroundColor: green[400] }}
                onClick={() => handlePublished(post.id)}
              >
                Published
              </Button>

              <Button
                sx={{ px: 3 }}
                variant="contained"
                style={{ backgroundColor: red["A200"] }}
                onClick={() => handleDelete(post.id)}
              >
                Delete
              </Button>
            </CardActions>
          </Card>
        ))}

        <Container sx={{ width: "fit-content" }}>
          <Pagination
            count={totalPages}
            color="primary"
            onChange={handlePagination}
          />
        </Container>
      </Paper>
    </Container>
  );
};

export default Draft;
