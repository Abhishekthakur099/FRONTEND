import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "./CandidateCss.css";
import axios from "axios";
const http = axios.create({
  baseURL: "http://localhost:4321",
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

function CandidateForm() {
  const [formData, setformData] = useState({
    name: "",
    age: "",
    isVerified: "",
    image: "",
  });

  const handleChange = (e) => {
    const newData = { ...formData };
    newData[e.target.name] = e.target.value;

    setformData(newData);
    console.log(formData);
  };
  const handleSumbit = (e) => {
    e.preventDefault();
    let data = new FormData(e.target);
    console.log(data);
    http
      .post("u", data)
      .then((res) => console.log(res.data))
      .catch((err) => err.message);
  };

  return (
    <div className="background-image">
      <div className="header">JOB APPLICANT DETAILS</div>
      <Form onSubmit={(e) => handleSumbit(e)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className="font">Name</Form.Label>
          <Form.Control
            type="name"
            onChange={(e) => handleChange(e)}
            placeholder="Enter Name"
            name="name"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label className="font">Age</Form.Label>
          <Form.Control
            type="number"
            onChange={(e) => handleChange(e)}
            placeholder="enter age"
            name="age"
          />
        </Form.Group>
        {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Label>Verification</Form.Label>
          <Form.Control
            type="boolean"
            placeholder="isVerified"
            name="isVerified"
            onChange={(e) => handleChange(e)}
          />
        </Form.Group> */}
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Label className="font">File</Form.Label>
          <Form.Control
            type="file"
            name="image"
            multiple
            onChange={(e) => handleChange(e)}
          />
        </Form.Group>
        <div>
          <label className="font">Verified:</label>
          <select
            className="dropdown"
            name="isVerified"
            onChange={(e) => handleChange(e)}
          >
            <option value="true">Verified</option>
            <option value="false">NotVerified</option>
          </select>
        </div>
        <div className="verify ">
          <Button className="btn-primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default CandidateForm;
