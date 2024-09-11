import { ErrorMessage, Field } from "formik";
import TextError from "./TextError";
import { IconInfoCircle } from "@tabler/icons-react";
import { Tooltip } from "react-tooltip";

const TextArea = (props) => {
  const { label, name, placeholder, withAsterisk, disabled, ...rest } =
    props;
  return (
    <div className="form-control">
      <div className="flex items-center gap-1">
        <label htmlFor={name} className="label">
          {label}
        </label>
        {withAsterisk && <span className="asterisk"> *</span>}
      </div>

      <Field
        as="textarea"
        id={name}
        name={name}
        placeholder={placeholder}
        disabled={disabled}
        {...rest}
        className="textarea"
      />

      <ErrorMessage name={name} component={TextError} />
    </div>
  );
};

export default TextArea;
