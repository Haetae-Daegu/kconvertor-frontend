const ResultDisplay = ({amount, fromCurrency, result, toCurrency}) => (
  <div className="mt-4 rounded-lg bg-gray-100 p-4 text-center">
    <p className="text-lg font-medium text-gray-800">
      {amount} {fromCurrency} = {result} {toCurrency}
    </p>
  </div>
);

export default ResultDisplay;