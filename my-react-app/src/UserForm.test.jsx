import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UserForm from "./UserForm";

describe("UserForm", () => {
  test("renders all form fields and buttons", () => {
    render(<UserForm />);

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/age/i)).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /submit/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /reset/i })
    ).toBeInTheDocument();
  });

  test("shows validation errors when submitting empty form", async () => {
    const user = userEvent.setup();

    render(<UserForm />);

    await user.click(
      screen.getByRole("button", { name: /submit/i })
    );

    expect(
      await screen.findByText("Name is required")
    ).toBeInTheDocument();

    expect(
      await screen.findByText("Email is required")
    ).toBeInTheDocument();

    expect(
      await screen.findByText("Age is required")
    ).toBeInTheDocument();
  });

  test("shows validation errors for invalid email and age", async () => {
    const user = userEvent.setup();

    render(<UserForm />);

    await user.type(
      screen.getByLabelText(/name/i),
      "John Doe"
    );

    await user.type(
      screen.getByLabelText(/email/i),
      "invalid-email"
    );

    await user.type(
      screen.getByLabelText(/age/i),
      "15"
    );

    await user.click(
      screen.getByRole("button", { name: /submit/i })
    );

    expect(
      await screen.findByText(
        "Please enter a valid email address"
      )
    ).toBeInTheDocument();

    expect(
      await screen.findByText(
        "Age must be at least 18"
      )
    ).toBeInTheDocument();
  });

  test("submits successfully with valid data", async () => {
    const user = userEvent.setup();

    const consoleSpy = jest
      .spyOn(console, "log")
      .mockImplementation(() => {});

    render(<UserForm />);

    await user.type(
      screen.getByLabelText(/name/i),
      "John Doe"
    );

    await user.type(
      screen.getByLabelText(/email/i),
      "john@example.com"
    );

    await user.type(
      screen.getByLabelText(/age/i),
      "25"
    );

    await user.click(
      screen.getByRole("button", { name: /submit/i })
    );

    expect(consoleSpy).toHaveBeenCalledWith(
      "Form Data:",
      {
        name: "John Doe",
        email: "john@example.com",
        age: 25,
      }
    );

    consoleSpy.mockRestore();
  });
});

