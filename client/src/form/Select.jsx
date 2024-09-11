import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";
import { IconInfoCircle } from "@tabler/icons-react";
import { Tooltip } from "react-tooltip";

function Select(props) {
  const {
    label,
    name,
    options,
    withAsterisk,
    disabled,
    tooltip,
    placeholder,
    ...rest
  } = props;

  return (
    <div className="form-control">
      <div className="flex items-center gap-1">
        <label htmlFor={name} className="label">
          {label}
        </label>
        {withAsterisk && <span className="asterisk"> *</span>}
        {tooltip && (
          <>
            <IconInfoCircle
              color="#374151"
              size={16}
              stroke={1.5}
              id="icon-info"
            />
            <Tooltip anchorSelect="#icon-info" className="max-w-sm z-50">
              {tooltip}
            </Tooltip>
          </>
        )}
      </div>

      <Field
        as="select"
        id={name}
        name={name}
        disabled={disabled}
        {...rest}
        className="input"
      >
        <option value="" key="">
          {placeholder || `Select task ${name}`}
        </option>
        {options &&
          options.map((option, index) => {
            return (
              <option key={index} value={option.value}>
                {option.key}
              </option>
            );
          })}
      </Field>

      <ErrorMessage component={TextError} name={name} />
    </div>
  );
}

export default Select;
