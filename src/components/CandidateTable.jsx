import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert2";
import { Table, Button, Pagination } from "react-bootstrap";
import { AiOutlineSearch } from "react-icons/ai";

import queryString from "query-string";
const http = axios.create({
  baseURL: "http://localhost:4321",
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

function CandidateTable() {
  const navigator = useNavigate();
  const [data, setData] = useState(null);
  const [totalRecord, settotalRecord] = useState(0);
  const [inputText, setInputText] = useState("");
  const [tableFilter, setTableFilter] = useState([]);
  const [query, setQuery] = useState({
    limit: 3,
    page: 0,
    sortOrder: -1,
    sortBy: "age",
  });
  const linksArray = data && [
    ...Array(Math.ceil(totalRecord / query.limit)).keys(),
  ];
  useEffect(() => {
    http(`applicant?${queryString.stringify(query)}`)
      .then((res) => {
        setData(res.data.result);
        settotalRecord(res.data.count);
      })
      .catch((err) => console.log(err.message));
  }, [query]);
  const inputHandler = (e) => {
    if (e.target.value != "") {
      setInputText(e.target.value.toLocaleLowerCase());
      const filterTable = data.filter((o) =>
        Object.keys(o).some((k) =>
          String(o[k])
            .toLocaleLowerCase()
            .includes(inputText.toLocaleLowerCase())
        )
      );
      setTableFilter([...filterTable]);
    } else {
      setInputText(e.target.value);
      setData([...data]);
    }
  };
  const handleDelete = (id) => {
    swal
      .fire({
        title: "Pakki gal e?",
        text: "baada ch change ni kri skda!",
        icon: "hui gya",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Delete!",
      })
      .then((result) => {
        if (result.isConfirmed) {
          console.log("confirm");
          http
            .delete(`u/${id}`)
            .then((res) => {
              if (res.status == 200) {
                swal.fire("Done", "kri tya", "success");
              }
            })
            .catch((err) => {
              swal.fire("Oops", "Something went wrong", "error");
            });
        }
      });
  };
  return (
    <div className="back">
      <input
        type="text"
        placeholder="search bar"
        onChange={inputHandler}
        className="input-search"
      />
      <AiOutlineSearch size={"30px"} />
      <Table variant="dark" striped hover className="mt-4 w-100">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th onClick={() => setQuery({ ...query, sortBy: "name" })}>Name</th>
            <th onClick={() => setQuery({ ...query, sortBy: "age" })}>Age</th>
            <th scope="col">Verification</th>
            <th scope="col">Images</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {inputText.length > 0
            ? tableFilter.map((pro) => (
                <tr>
                  <td>{pro._id}</td>
                  <td>{pro.name}</td>
                  <td>{pro.age}</td>
                  <td>{pro.isVerified.toString()}</td>
                  <td>{pro.image}</td>
                  <td>
                    <Button
                      onClick={() => navigator(`updateform/${pro._id}`)}
                      variant="secondary"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(pro._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            : data.map((pro) => (
                <tr>
                  <td>{pro._id}</td>
                  <td>{pro.name}</td>
                  <td>{pro.age}</td>
                  <td>{pro.isVerified.toString()}</td>
                  <td>{pro.image}</td>
                  <td>
                    <Button
                      onClick={() => navigator(`updateform/${pro._id}`)}
                      variant="secondary"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(pro._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
        </tbody>
      </Table>
      <Pagination>
        {linksArray.map((link) => {
          return (
            <Pagination.Item
              onClick={() => setQuery({ ...query, page: +link })}
            >
              {link + 1}
            </Pagination.Item>
          );
        })}
      </Pagination>
    </div>
  );
}

export default CandidateTable;
