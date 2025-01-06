const ErrorPanel = ({message}) => (
  <div className="mt-4 rounded-lg bg-red-100 p-4 text-center">
    <p className="text-lg font-medium text-red-600">{message}</p>
  </div>
);


export default ErrorPanel;