import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import { Button, Grid, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { red, amber, grey } from "@mui/material/colors";

const Edit = () => {
  const baseUrl = "http://dev.opensource-technology.com:3000";
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({
    title: "",
    content: "",
  });

  const fetchDataById = async (id) => {
    try {
      const response = await axios.get(`${baseUrl}/api/posts/${id}`);
      setPost(response.data);
    } catch (error) {
      console.log("error", error.response.data.error);
    }
  };

  useEffect(() => {
    fetchDataById(id);
  }, [id]);

  console.log(post);

  const handleSubmit = (event) => {
    event.preventDefault();

    try {
      axios.patch(`${baseUrl}/api/posts/${id}`, post);
      navigate('/');
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleDelete = (id) => {
    try {
      axios.delete(`${baseUrl}/api/posts/${id}`);
      navigate('/')
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <Container maxWidth="sm" sx={{ padding: 5 }}>
      <Paper sx={{ my: 10, p: 4 }} style={{ backgroundColor: amber[100] }}>
        <Typography align="center" variant="h3" gutterBottom>
          Edit Post
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="title"
                variant="outlined"
                fullWidth
                style={{ backgroundColor: amber[50] }}
                value={post.title}
                onChange={(e) => setPost({ ...post, title: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="content"
                variant="outlined"
                fullWidth
                style={{ backgroundColor: amber[50] }}
                value={post.content}
                onChange={(e) => setPost({ ...post, content: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                style={{ color: grey[900], backgroundColor: amber[700] }}
              >
                Save
              </Button>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Link to={"/"}>
                <Button
                  variant="contained"
                  fullWidth
                  style={{ color: grey[900], backgroundColor: red["A200"] }}
                >
                  Cancel
                </Button>
              </Link>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button
                variant="contained"
                fullWidth
                style={{ color: grey[900], backgroundColor: red["A400"] }}
                onClick={() => handleDelete(post.id)}
              >
                Delete
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Edit;
