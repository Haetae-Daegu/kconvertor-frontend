import {useEffect, useState} from "react"
import axios from 'axios';

const Convert = () => {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("EUR");
  const [toCurrency, setToCurrency] = useState("KRW");
  const [result, setResult] = useState(null);

  const handleConvert = () => {
    const conversionRate = 0.85;
    axios.get('http://127.0.0.1:5000/currency/', {})
      .then(res => {
        const from = res.data["KRW"]
        setResult(from);

      })
    setResult((amount * conversionRate).toFixed(2));
  };

  return (
    <div className="flex flex-col gap-6 rounded-3xl bg-white p-6 shadow-3xl md:p-8">
      <h2 className="text-xl font-bold text-gray-800">Currency Converter</h2>
      <div className="flex flex-col gap-4">
        <input
          type="number"
          className="w-full rounded-lg border border-gray-300 p-3 text-gray-800 focus:border-blue-500 focus:outline-none"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <div className="flex gap-4">
          <select
            className="w-1/2 rounded-lg border border-gray-300 p-3 text-gray-800 focus:border-blue-500 focus:outline-none"
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
          >
            <option value="EUR">EUR</option>
            <option value="KRW">KRW</option>
          </select>
          <select
            className="w-1/2 rounded-lg border border-gray-300 p-3 text-gray-800 focus:border-blue-500 focus:outline-none"
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
          >
            <option value="EUR">EUR</option>
            <option value="KRW">KRW</option>
          </select>
        </div>
        <button
          className="w-full rounded-lg bg-blue-500 p-3 text-white hover:bg-blue-600"
          onClick={handleConvert}
        >
          Convert
        </button>
      </div>
      {result !== null && (
        <div className="mt-4 rounded-lg bg-gray-100 p-4 text-center">
          <p className="text-lg font-medium text-gray-800">
            {amount} {fromCurrency} = {result} {toCurrency}
          </p>
        </div>
      )}
    </div>
  );
};

export default Convert;