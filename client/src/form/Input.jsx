import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";

const Input = (props) => {
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
        id={name}
        name={name}
        placeholder={placeholder}
        disabled={disabled}
        {...rest}
        className="input"
      />
      
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
};

export default Input;
