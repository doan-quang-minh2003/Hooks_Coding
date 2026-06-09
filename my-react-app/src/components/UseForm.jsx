import { useForm } from "react-hook-form";

function UserForm() {
  const {
    register,
    handleSubmit,
    reset,
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
          <label htmlFor="name">Name:</label>
          <br />
          <input
            id="name"
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
          <label htmlFor="email">Email:</label>
          <br />
          <input
            id="email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email address",
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
          <label htmlFor="age">Age:</label>
          <br />
          <input
            id="age"
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
        <button type="button" onClick={() => reset()}>
          Reset
        </button>
      </form>
    </div>
  );
}

export default UserForm;
