import React, { MouseEventHandler } from "react";

interface Props {
  isVisible: boolean;
  onToggle: MouseEventHandler<HTMLButtonElement>
  className: string;
}

const ToggleButton = (props: Props) => {
  return (
    <button
      className={`rounded-lg bg-blue-500 p-2 hover:bg-gray-300 ${props.className}`}
      onClick={props.onToggle}
    >
      {props.isVisible ? "-" : "+"}
    </button>
  );
};

export default ToggleButton;
