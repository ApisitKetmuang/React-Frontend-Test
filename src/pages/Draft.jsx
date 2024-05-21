import React from "react";
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
import { red, green, grey, indigo } from "@mui/material/colors";
import Divider from '@mui/material/Divider';


import Nav from "../components/Nav";

const Draft = () => {
  const baseUrl = "http://dev.opensource-technology.com:3000";
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate()

  const fetchData = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/posts/draft`);
      setPosts(response.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlePublished = (id) => {
    try {
      axios.patch(`${baseUrl}/api/posts/${id}`, {published: true});
      navigate('/')
    } catch (error) {
      console.log("error", error);
    }
  }

  const handleDelete = (id) => {
    try {
      axios.delete(`${baseUrl}/api/posts/${id}`);
      fetchData();
    } catch (error) {
      console.log("error", error);
    }
  }

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

            <Divider variant="middle" sx={{ mb: 1}}/>

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
                <Button sx={{ flexShrink: 0 }} variant="contained" m={2}>
                  Edit
                </Button>
              </Link>

              <Button
                sx={{ px: 3 }}
                variant="contained"
                style={{  backgroundColor: green[400] }}
                onClick={() => handlePublished(post.id)}
              >
                Published
              </Button>

              <Button
                sx={{ px: 3 }}
                variant="contained"
                style={{  backgroundColor: red["A200"] }}
                onClick={() => handleDelete(post.id)}
              >
                Delete
              </Button>
            </CardActions>
          </Card>
        ))}
      </Paper>
    </Container>
  );
};

export default Draft;
