import { useForm } from "react-hook-form";
import "./UseForm.css";

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
    <div className="user-form-container">
      <h2 className="form-title">User Registration Form</h2>

      <form className="user-form" onSubmit={handleSubmit(onSubmit)}>
        {/* Name */}
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            className="form-input"
            {...register("name", {
              required: "Name is required",
            })}
          />
          {errors.name && (
            <p className="error">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            className="form-input"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email address",
              },
            })}
          />
          {errors.email && (
            <p className="error">{errors.email.message}</p>
          )}
        </div>

        {/* Age */}
        <div className="form-group">
          <label htmlFor="age">Age:</label>
          <input
            id="age"
            type="number"
            className="form-input"
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
            <p className="error">{errors.age.message}</p>
          )}
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">Submit</button>
          <button type="button" className="btn btn-secondary" onClick={() => reset()}>
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserForm;
