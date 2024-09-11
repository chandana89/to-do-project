import * as yup from "yup";

const jobTitleRule = /^[a-zA-Z0-9\s,'-.]+$/;
const noConsecutiveSpecialCharsRule = /^(?!.*([,'-.])\1).*$/;
const noStartEndSpecialCharsRule = /^(?!^[,'-.])(?!.*[,'-.]$).*$/;
const generalTextRule = /^[a-zA-Z0-9\s.,;:?!()\-_'\"&@#/$%*]*$/;

export const addTaskSchema = yup.object().shape({
  title: yup
            .string()
            .trim()
            .min(1, "Must be at least 1 character long")
            .max(100, "Must not exceed 100 characters")
            .matches(jobTitleRule, { message: "Please enter a valid job title" })
            .test(
                "noConsecutiveSpecialCharsRule",
                "Please enter a valid job title",
                (value) => noConsecutiveSpecialCharsRule.test(value)
            )
            .test(
                "noStartEndSpecialCharsRule",
                "Please enter a valid job title",
                (value) => noStartEndSpecialCharsRule.test(value)
            )
            .required("This field is required"),
  description: yup
            .string()
            .trim()
            .min(10, "Must be at least 10 characters")
            .max(4000, "Must be at most 4000 characters")
            .matches(
                generalTextRule,
                "Must only contain letters, numbers, and standard punctuation"
            )
            .required("This field is required"),
    status :yup
            .string()
            .trim()
            .oneOf(["pending", "completed"], "Please enter a valid status")
            .required("This field is required"),
});