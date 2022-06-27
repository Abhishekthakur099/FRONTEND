import { React, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import CandidateForm from "./components/CandidateForm";
import CandidateTable from "./components/CandidateTable";
import Page404 from "./Page404";
import CandidateUpdateForm from "./components/CandidateUpdateForm";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/candidate">
          <Route index element={<CandidateTable />} />
          <Route path="applicationform" element={<CandidateForm />} />
          <Route path="updateform/:id" element={<CandidateUpdateForm />} />
        </Route>
        <Route path="/*" element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default App;
