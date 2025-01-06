const CurrencySelector = ({ value, onChange, options}) => (
  <select
    className="w-1/2 rounded-lg border border-gray-300 p-3 text-gray-800 focus:border-blue-500 focus:outline-none"
    value={value}
    onChange={onChange}
  >
    {options.map((option) => ( 
      <option key={option} value={option}>
        {option}
      </option>
    ))}
  </select>
);

export default CurrencySelector;