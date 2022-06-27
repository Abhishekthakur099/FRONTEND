import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
// import http from "../../config/axiosConfig.js";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./CandidateCss.css";
const http = axios.create({
  baseURL: "http://localhost:4321",
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

function CanddidateUpdateForm() {
  const ID = useParams().id;
  const [formData, setFormData] = useState(null);
  // const [categoy, setCategoy] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    http.put(`applicant/${ID}`, formData);
  };
  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    http(`applicant/${ID}`).then((res) => {
      if (res.status == 200) {
        setFormData(res.data);
      }
    });
  }, []);
  console.log("formdata", formData);
  return (
    <div className="background-image">
      <Form onSubmit={handleSubmit} onChange={handleFormChange}>
        <input type="hidden" name="_id" value={formData?._id} />
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className="font">Name</Form.Label>
          <Form.Control
            name="name"
            type="text"
            placeholder="Name"
            value={formData.name}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className="font">Age</Form.Label>
          <Form.Control
            name="age"
            type="number"
            placeholder="age"
            value={formData.age}
          />
        </Form.Group>

        {/* <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Upload</Form.Label>
          <Form.Control
            type="file"
            multiple
            name="image"
            placeholder="Description"
            value={formData?.image}
          />
        </Form.Group> */}
        <div>
          <label className="font">Verified:</label>
          <select
            className="dropdown"
            name="isVerified"
            value={formData.isVerified}
          >
            <option value="true">Verified</option>
            <option value="false">NotVerified</option>
          </select>
        </div>
        <div className="verify ">
          <Button type="submit" variant="primary">
            UPDATE DATA
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default CanddidateUpdateForm;
