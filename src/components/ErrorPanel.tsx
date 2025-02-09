interface Props {
  message: string;
}

const ErrorPanel = (props: Props) => (
  <div className="mt-4 rounded-lg bg-red-100 p-4 text-center">
    <p className="text-lg font-medium text-red-600">{props.message}</p>
  </div>
);


export default ErrorPanel;