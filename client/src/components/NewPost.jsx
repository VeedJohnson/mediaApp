import axios from "axios";
import { useState, useEffect } from "react";
import { Form, FormControl, FormGroup } from "react-bootstrap";

export default function NewPost(props) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const [categoryData, setCategoryData] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/category")
      .then(({ data }) => {
        setCategoryData(data?.data);
      })
      .catch(({ response }) => {});
  }, []);
  return (
    <div>
      <Form
        method="POST"
        encType="multipart/form-data"
        onSubmit={(e) => {
          e.preventDefault();
          const user = JSON.parse(localStorage.getItem("media_user"));

          const formData = new FormData();
          formData.append("title", title);
          formData.append("category", category);
          formData.append("description", description);
          formData.append("image", image);
          formData.append("user", user.id);

          axios
            .post("http://localhost:5000/api/post/new/post", formData, {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            })
            .then(({ data }) => {
              console.log(data);
              props.history.push("/main/posts");
            })
            .catch(({ response }) => {
              console.log(response);
            });
        }}
      >
        <FormGroup>
          <FormControl
            type="text"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            placeholder="title"
          />
        </FormGroup>
        <FormGroup>
          <select
            type="text"
            onChange={(e) => {
              setCategory(e.target.value);
            }}
            className="form-control"
            placeholder="category"
          >
            <option>Select category</option>
            {categoryData?.map((cat) => {
              return <option value={cat._id}>{cat.title}</option>;
            })}
          </select>
        </FormGroup>
        <FormGroup>
          <FormControl
            type="file"
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
          />
        </FormGroup>
        <FormGroup>
          <FormControl
            type="text"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            placeholder="description"
          />
        </FormGroup>
        <FormGroup>
          <FormControl
            type="submit"
            className="btn btn-primary"
            value="add post"
          />
        </FormGroup>
      </Form>
    </div>
  );
}
