import "./Button.css"

const Button = ({ title, ...props }) => {
  return (
    <button variant={'primary'} {...props} className="button-main">
      {title}
    </button>
  );
};

export default Button;