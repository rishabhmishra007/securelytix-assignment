import { Eye, EyeOff } from "lucide-react";

const Input = ({
  icon: Icon,
  showToggle = false,
  onToggle,
  type,
  ...props
}) => {
  const isPassword = props.name === "password";
  return (
    <div className="relative mb-4">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Icon className="size-5 text-violet-500" />
      </div>
      <input
        {...props}
		type={type}
        className="w-full pl-10 pr-3 py-2 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 focus:border-violet-500 focus:ring-2 focus:ring-violet-500 text-white placeholder-gray-400 transition duration-200"
      />
      {showToggle && isPassword && (
        <button
          type="button"
          onClick={onToggle}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-white"
        >
          {type === "password" ? <Eye /> : <EyeOff />}
        </button>
      )}
    </div>
  );
};
export default Input;
