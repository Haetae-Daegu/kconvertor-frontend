const InputField = ({value, onChange, placeholder}) => (
    <input
      type="number"
      className="w-full rounded-lg border border-gray-300 p-3 text-gray-800 focus:border-blue-500 focus:outline-none"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
);

export default InputField;