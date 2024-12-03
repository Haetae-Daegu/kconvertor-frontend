import {useEffect, useState} from "react"
import axios from 'axios';


const API_URL = process.env.API_ENDPOINT

const Convert = () => {
  const [amount, setAmount] = useState("");
  const [tmpAmount, setTmpAmount] = useState("")
  const [fromCurrency, setFromCurrency] = useState("EUR");
  const [toCurrency, setToCurrency] = useState("KRW");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null)

  const handleConvert = () => {
    axios.post(`http://127.0.0.1:5000/currency/`, {
      from_currency: fromCurrency,
      to_currency: toCurrency,
      amount: amount
    })
    .then((response) => {
      setError(null)
      setTmpAmount(amount)
      const from_currency = response.data["KRW"]
      setResult(from_currency);
    })
    .catch((error) => {
      setResult(null)
      if (error.response) {
        if (error.response.status === 500) {
          setError("Internal server error: Please try again later.");
        } else {
          setError(`Error ${error.response.status}: ${message}`);
        }
      } else if (error.request) {
        setError("Service unavailable. Please try again later.")
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    })
  };

  return (
  <div className="mx-auto max-w-3xl flex flex-col gap-6 rounded-3xl bg-white p-6 shadow-3xl md:p-8">
    <h2 className="text-xl font-bold text-gray-800">
      Select your currencies and put the amount that you want to convert
    </h2>
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
    {result !== null && error == null && (
      <div className="mt-4 rounded-lg bg-gray-100 p-4 text-center">
        <p className="text-lg font-medium text-gray-800">
          {tmpAmount} {fromCurrency} = {result} {toCurrency}
        </p>
      </div>
    )}
    {error !== null && result == null && (
      <div className="mt-4 rounded-lg bg-red-100 p-4 text-center">
        <p className="text-lg font-medium text-red-600">{error}</p>
      </div>
    )}
    </div>

    );
};

export default Convert;