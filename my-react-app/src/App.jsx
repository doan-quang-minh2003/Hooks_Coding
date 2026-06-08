import React from "react";
import { useForm } from "react-hook-form";

function UserForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    alert("Form submitted successfully!");
  };

  return (
    <div style={{ maxWidth: "400px", margin: "20px auto" }}>
      <h2>User Registration Form</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Name */}
        <div style={{ marginBottom: "15px" }}>
          <label>Name:</label>
          <br />
          <input
            type="text"
            {...register("name", {
              required: "Name is required",
            })}
          />
          {errors.name && (
            <p style={{ color: "red" }}>
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div style={{ marginBottom: "15px" }}>
          <label>Email:</label>
          <br />
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email format",
              },
            })}
          />
          {errors.email && (
            <p style={{ color: "red" }}>
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Age */}
        <div style={{ marginBottom: "15px" }}>
          <label>Age:</label>
          <br />
          <input
            type="number"
            {...register("age", {
              required: "Age is required",
              valueAsNumber: true,
              min: {
                value: 18,
                message: "Age must be at least 18",
              },
              max: {
                value: 65,
                message: "Age must not exceed 65",
              },
            })}
          />
          {errors.age && (
            <p style={{ color: "red" }}>
              {errors.age.message}
            </p>
          )}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default UserForm;