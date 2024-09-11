const SubmitButton = ({ children, formik }) => {
  return (
    <button type="submit" disabled={formik && formik.isSubmitting} className="primary-btn">
      {children}
    </button>
  );
};

export default SubmitButton;
