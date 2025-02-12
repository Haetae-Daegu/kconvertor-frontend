interface Props {
  amount: number | undefined;
  fromCurrency: string;
  result: string;
  toCurrency: string
}

const ResultDisplay = (props: Props) => (
  <div className="mt-4 rounded-lg bg-gray-100 p-4 text-center">
    <p className="text-lg font-medium text-gray-800">
      {props.amount} {props.fromCurrency} = {props.result} {props.toCurrency}
    </p>
  </div>
);

export default ResultDisplay;