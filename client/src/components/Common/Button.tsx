import { cls } from "../../utils/utils";

const classes: { [key: string]: any } = {
  base: "focus:outline-none transition ease-in-out duration-300",
  disabled: "opacity-50 cursor-not-allowed",
  pill: "rounded-full",
  size: {
    small: "px-2 py-1 text-sm",
    normal: "px-4 py-2",
    large: "px-8 py-3 text-lg",
  },
  variant: {
    primary:
      "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded",
    secondary:
      "bg-gray-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded",
    danger:
      "bg-gray-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded",
  },
};

export const Button = ({
  children,
  className,
  variant = "primary",
  size = "normal",
  disabled = false,
  onClick,
}: {
  children: any;
  className?: string;
  variant?: string;
  size?: string;
  onClick?: React.MouseEventHandler;
  disabled?: boolean;
}) => {
  return (
    <button
      disabled={disabled}
      className={cls(`
                ${classes.base}
                ${classes.size[size]}
                ${classes.variant[variant]}
                ${disabled && classes.disabled}
                ${className}
            `)}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
