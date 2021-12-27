import axios from "axios";
import { useState, useEffect } from "react";
import { Form, FormControl, FormGroup } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";

export default function EditPost() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const [categoryData, setCategoryData] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/category")
      .then(({ data }) => {
        setCategoryData(data?.data);
      })
      .catch(({ response }) => {});
  }, []);

  let history = useHistory();
  const { id } = useParams();

  // const updatePost = (id) => {
  //   axios
  //     .put(`http://localhost:5000/api/post/${id}`, formData, { id: id })
  //     .then(() => {
  //       console.log("data updated");
  //     })
  //     .catch(({ response }) => {
  //       console.log(response);
  //     });
  // };
  return (
    <div>
      <Form
        method="POST"
        onSubmit={(e) => {
          e.preventDefault();
          const user = JSON.parse(localStorage.getItem("media_user"));

          // const formData = new FormData();
          // formData.append("title", title);
          // formData.append("description", description);
          // formData.append("user", user.id);
          // formData.append("id", id);
          axios
            .put(
              `http://localhost:5000/api/post/${id}`,
              { title: title, description: description },
              {
                headers: {
                  Authorization: `Bearer ${user.token}`,
                },
              }
            )
            .then(() => {
              console.log("data updated");
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
        {/* <FormGroup>
          <select
            type="text"
            onChange={(e) => {
              console.log(e.target.value);
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
        </FormGroup> */}
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
            value="Edit post"
          />
        </FormGroup>
      </Form>
    </div>
  );
}

// import axios from "axios";
// import { useState, useEffect } from "react";
// import { Form, FormControl, FormGroup } from "react-bootstrap";
// import { useHistory, useParams } from "react-router-dom";

// export default function EditPost() {
//   const [title, setTitle] = useState("");
//   const [category, setCategory] = useState("");
//   const [description, setDescription] = useState("");
//   const [image, setImage] = useState(null);

//   const [categoryData, setCategoryData] = useState(null);

//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/api/category")
//       .then(({ data }) => {
//         setCategoryData(data?.data);
//       })
//       .catch(({ response }) => {});
//   }, []);

//   let history = useHistory();
//   const { id } = useParams();
//   return (
//     <div>
//       <Form
//         method="POST"
//         encType="multipart/form-data"
//         onSubmit={(e) => {
//           e.preventDefault();
//           const user = JSON.parse(localStorage.getItem("media_user"));
//           //   const formData = new FormData();
//           //   formData.append("title", title);
//           //   formData.append("category", category);
//           //   formData.append("description", description);
//           //   formData.append("image", image);
//           //   formData.append("user", user.id);

//           axios
//             .put(`http://localhost:5000/api/post/${id}`, {
//               headers: {
//                 Authorization: `Bearer ${user.token}`,
//               },
//             })
//             .then(() => {
//               console.log("data updated");
//             })
//             .catch(({ response }) => {
//               console.log(response);
//             });
//         }}
//       >
//         <FormGroup>
//           <FormControl
//             type="text"
//             onChange={(e) => {
//               setTitle(e.target.value);
//             }}
//             placeholder="title"
//           />
//         </FormGroup>
//         <FormGroup>
//           <select
//             type="text"
//             onChange={(e) => {
//               console.log(e.target.value);
//               setCategory(e.target.value);
//             }}
//             className="form-control"
//             placeholder="category"
//           >
//             <option>Select category</option>
//             {categoryData?.map((cat) => {
//               return <option value={cat._id}>{cat.title}</option>;
//             })}
//           </select>
//         </FormGroup>
//         <FormGroup>
//           <FormControl
//             type="file"
//             onChange={(e) => {
//               setImage(e.target.files[0]);
//             }}
//           />
//         </FormGroup>
//         <FormGroup>
//           <FormControl
//             type="text"
//             onChange={(e) => {
//               setDescription(e.target.value);
//             }}
//             placeholder="description"
//           />
//         </FormGroup>
//         <FormGroup>
//           <FormControl
//             type="submit"
//             className="btn btn-primary"
//             value="Edit post"
//           />
//         </FormGroup>
//       </Form>
//     </div>
//   );
// }
