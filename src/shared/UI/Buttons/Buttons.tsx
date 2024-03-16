import "./Button.scss";

interface IButtonProps {
  color?: string;
  handleClick?: () => void;
  children?: React.ReactNode;
  style?: object;
  type?: string;
}

const Button: React.FC<IButtonProps> = ({
  handleClick,
  color,
  children,
  style,
}: IButtonProps) => {
  const colors = ["orange", "TFaded"];

  const setStyles = () => {
    if (color !== undefined) {
      if (!colors.includes(color)) return "ui-btn";

      return `ui-btn_${color}`;
    }

    return "ui-btn";
  };
  return (
    <button style={style} className={setStyles()} onClick={handleClick}>
      {children}
    </button>
  );
};

export default Button;
