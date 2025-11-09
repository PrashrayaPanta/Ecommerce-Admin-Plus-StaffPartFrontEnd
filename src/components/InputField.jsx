import { Form } from "react-bootstrap";

export const InputField = ({ type = "text", label, name, formik, as }) => {
  // console.log(label);
  // console.log(name);
  // console.log(formik);

  return (
    <div className="mb-3">
      <Form.Label htmlFor={name}>{label}</Form.Label>

      {label === "discountedPrice" || label === "Summary" ? null : (
        <svg
          stroke="currentColor"
          fill="none"
          strokeWidth="2"
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-danger mb-2"
          height="18"
          width="18"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 6v12"></path>
          <path d="M17.196 9 6.804 15"></path>
          <path d="m6.804 9 10.392 6"></path>
        </svg>
      )}

      <Form.Control
        type={type}
        as={as}
        name={name}
        id={name}
        onChange={formik.handleChange}
        value={formik.values[name]}
        onBlur={formik.handleBlur}
        isInvalid={formik.touched[name] && formik.errors[name]}
        isValid={formik.values[name] && !formik.errors[name]}
      />
      {formik.touched[name] && formik.errors[name] && (
        <Form.Control.Feedback type="invalid">
          {formik.errors[name]}
        </Form.Control.Feedback>
      )}
    </div>
  );
};
