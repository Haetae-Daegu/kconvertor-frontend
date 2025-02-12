import React, {ChangeEventHandler} from "react";


interface Props {
  value: number | undefined;
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeholder: string
}

const InputField = (props: Props) => (
    <input
      type="number"
      className="w-full rounded-lg border border-gray-300 p-3 text-gray-800 focus:border-blue-500 focus:outline-none"
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
    />
);

export default InputField;