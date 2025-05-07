import React, { useEffect, useState } from "react";
import { EData } from "./EmployeeData";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CRUD = () => {
  const [data, setData] = useState([]);
  const [emp, setEmp] = useState({
    fName: "",
    lName: "",
    age: "",
    designation: "",
  });
  const [isUpdate, setIsUpdate] = useState(false);
  const [currentEditId, setCurrentEditId] = useState(null);

  //handle change function
  const handleChange = (e, props) => {
    const fieldvalue = { ...emp, [props]: e.target.value };
    console.log(fieldvalue);
    setEmp(fieldvalue);
  };

  // submit data function
  const onSubmit = (event) => {
    event.preventDefault();
    if (!validateForm()) return;
    const dt = [...data, emp];
    setData(dt);
    setEmp({
      fName: "",
      lName: "",
      age: "",
      designation: "",
    });
    localStorage.setItem("employeeList", JSON.stringify(dt));
    toast.success("Employee saved successfully!");
  };

  // validation form
  const validateForm = () => {
    if (
      (!emp.fName.trim() && !emp.lName.trim() && !emp.age.trim()) ||
      (isNaN(emp.age) && !emp.designation.trim())
    ) {
      alert("All Fields are reqired");
      return false;
    } else {
      if (!emp.fName.trim()) {
        alert("First Name is required");
        return false;
      }
      if (!emp.lName.trim()) {
        alert("Last Name is required");
        return false;
      }
      if (!emp.age.trim() || isNaN(emp.age)) {
        alert("Valid Age is required");
        return false;
      }
      if (!emp.designation.trim()) {
        alert("Designation is required");
        return false;
      }
      return true;
    }
  };

  //Clear button in Form
  const handleClear = () => {
    setEmp({
      fName: "",
      lName: "",
      age: "",
      designation: "",
    });
    setIsUpdate(false);
  };

  useEffect(() => {
    const empData = localStorage.getItem("employeeList");
    console.log(empData);
    if (empData) {
      setData(JSON.parse(empData));
    }
  }, []);

  //  Update button function
  const handleUpdate = () => {
    if (!validateForm()) return;
    if (isUpdate && currentEditId !== null) {
      const updatedData = data.map((item, index) =>
        index === currentEditId ? emp : item
      );
      setData(updatedData);
      localStorage.setItem("employeeList", JSON.stringify(updatedData));
      toast.success("Employee updated successfully!");
      setEmp({
        fName: "",
        lName: "",
        age: "",
        designation: "",
      });
      setIsUpdate(false);
      setCurrentEditId(null);
    }
  };
  // Edit button in table
  const handleEdit = (id) => {
    console.log("id:" + id);
    const editEmp = data[id];
    console.log("edit emp " + editEmp);
    setEmp(editEmp);
    setIsUpdate(true);
    setCurrentEditId(id);
  };

  // Delete Button in table
  const handleDelete = (ind) => {
    const confirmDlt = window.confirm(
      "Are you sure you want to delete this Employee?"
    );
    if (confirmDlt) {
      const newEmps = data.filter((_, index) => index !== ind);
      setData(newEmps);
      localStorage.setItem("employeeList", JSON.stringify(newEmps));
      toast.info("Employee Deleted successfully");
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <h1 className="text-center text-decoration-underline">CRUD Operation</h1>
      <form>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            margin: "40px 0px",
          }}
        >
          <div>
            <label>First Name : </label>
            <input
              type="text"
              placeholder="Enter First Name"
              name="fName"
              value={emp.fName}
              onChange={(e) => handleChange(e, "fName")}
              required
            />
          </div>
          <div>
            <label>Last Name :</label>
            <input
              type="text"
              placeholder="Enter Last Name"
              name="lName"
              value={emp.lName}
              onChange={(e) => handleChange(e, "lName")}
              required
            />
          </div>
          <div>
            <label>Age :</label>
            <input
              type="text"
              placeholder="Enter Age"
              name="age"
              value={emp.age}
              onChange={(e) => handleChange(e, "age")}
              required
            />
          </div>
          <div>
            <label>Designation : </label>
            <input
              type="text"
              placeholder="Enter Designation"
              name="designation"
              value={emp.designation}
              onChange={(e) => handleChange(e, "designation")}
              required
            />
          </div>
          <div>
            <button
              className="btn btn-success me-2"
              onClick={isUpdate ? handleUpdate : onSubmit}
            >
              {isUpdate ? "Update" : "Save"}
            </button>

            <button className="btn btn-warning" onClick={() => handleClear()}>
              Clear
            </button>
          </div>
        </div>
      </form>
      <div>
        <hr />
        <h2 className="text-center text-decoration-underline">
          Employee Table
        </h2>
        <table className="table table-hover text-center">
          <thead>
            <tr>
              <td>Employee ID</td>
              <td>First Name</td>
              <td>Last Name</td>
              <td>Age</td>
              <td>Designation</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              return (
                <tr id={index}>
                  <td>10{index + 1}</td>
                  <td>{item.fName}</td>
                  <td>{item.lName}</td>
                  <td>{item.age}</td>
                  <td>{item.designation}</td>
                  <td>
                    <button
                      className="btn btn-primary me-3"
                      onClick={(e) => handleEdit(index)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      id="handleDelete"
                      onClick={(e) => handleDelete(index)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CRUD;
