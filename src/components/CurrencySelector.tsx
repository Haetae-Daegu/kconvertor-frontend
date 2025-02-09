import React, {ChangeEvent, ChangeEventHandler} from "react";

interface Props {
  value: string;
  onChange: ChangeEventHandler<HTMLSelectElement>;
  options: Array<string>;
}

const CurrencySelector = (props: Props) => (
  <select
    className="w-1/2 rounded-lg border border-gray-300 p-3 text-gray-800 focus:border-blue-500 focus:outline-none"
    value={props.value}
    onChange={props.onChange}
  >
    {props.options.map((option) => ( 
      <option key={option} value={option}>
        {option}
      </option>
    ))}
  </select>
);

export default CurrencySelector;