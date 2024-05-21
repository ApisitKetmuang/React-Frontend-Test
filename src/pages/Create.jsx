import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import { Button, Grid, Typography } from "@mui/material";
import { red, amber, grey } from "@mui/material/colors";

const Create = () => {
  const baseUrl = "http://dev.opensource-technology.com:3000";
  const navigate = useNavigate();
  const [post, setPost] = useState({
    title: "",
    content: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!post.title) {
      alert("title is required");
    } else if (!post.content) {
      alert("content is required");
    } else {
      try {
        axios.post(`${baseUrl}/api/posts`, post);
        navigate("/draft");
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  return (
    <Container maxWidth="sm" sx={{ padding: 5 }}>
      <Paper sx={{ my: 10, p: 4 }} style={{ backgroundColor: amber[100] }}>
        <Typography align="center" variant="h3" gutterBottom>
          New Post
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="title"
                label="Title"
                variant="outlined"
                fullWidth
                style={{ backgroundColor: amber[50] }}
                onChange={(e) => setPost({ ...post, title: e.target.value })}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                id="content"
                label="Content"
                variant="outlined"
                fullWidth
                style={{ backgroundColor: amber[50] }}
                onChange={(e) => setPost({ ...post, content: e.target.value })}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                style={{ color: grey[900], backgroundColor: amber[700] }}
              >
                Save
              </Button>
            </Grid>

            <Grid item xs={12} sm={6}>
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
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Create;
