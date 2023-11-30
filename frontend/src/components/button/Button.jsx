import "./Button.css"

const Button = ({ children, ...props }) => {
  return (
    <button variant={'primary'} {...props} className="button-main">
      {children}
    </button>
  );
};

export default Button;