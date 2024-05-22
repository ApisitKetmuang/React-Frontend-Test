import React from "react";
import axios from "axios";
import moment from "moment";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Card, Container } from "@mui/material";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";

import { indigo, blue } from "@mui/material/colors";

import Nav from "../components/Nav";

const Post = () => {
  const baseUrl = "http://dev.opensource-technology.com:3000";
  const [posts, setPosts] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/posts?page=1&limit=10`);
      setPosts(response.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container
      maxWidth="md"
      sx={{ padding: 4 }}
      style={{ backgroundColor: indigo[100] }}
    >
      <Paper sx={{ padding: 2 }} style={{ backgroundColor: indigo[50] }}>
        <Nav />

        {posts.posts?.map((post, index) => (
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
            </CardActions>
          </Card>
        ))}
      </Paper>
    </Container>
  );
};

export default Post;
