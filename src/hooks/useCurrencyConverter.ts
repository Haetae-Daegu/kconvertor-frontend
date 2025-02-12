import { useState } from "react"
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const useCurrencyConvertor = () => {
  const [amount, setAmount] = useState<number>();
  const [fromCurrency, setFromCurrency] = useState("EUR");
  const [toCurrency, setToCurrency] = useState("KRW");
  const [result, setResult] = useState(null);
  const [error, setError] = useState<string | null>("")

  const handleConvert = async() => {
    if (!amount || isNaN(amount)) {
      setResult(null)
      setError("Enter a valid amount")
      return
    }

    try {
      const response = await axios.post(`${API_URL}/currency/`, {
        from_currency: fromCurrency,
        to_currency: toCurrency,
        amount: amount
      });

      setError(null);
      setResult(response.data[toCurrency]);
    } catch (err: unknown) {
      setResult(null)
      if (axios.isAxiosError(err)) {
        if (err.response) {
          const status = err.response.status;
          if (status === 500) {
            setError("Internal server error: Please try again later.");
          } else {
            setError(`Error ${status}: ${err.response.data?.message || "Unknown error"}`);
          }
        } else if (err.request) {
          setError("Service unavailable. Please try again later.");
        } else {
          setError("An unexpected error occurred. Please try again.");
        }
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  }

  const swapCurrencies = () => {
    setFromCurrency((prev) => (prev === "EUR" ? "KRW" : "EUR"));
    setToCurrency((prev) => (prev === "KRW" ? "EUR" : "KRW"));
  }

  return {
    amount,
    setAmount,
    fromCurrency,
    setFromCurrency,
    toCurrency,
    setToCurrency,
    result,
    error,
    handleConvert,
    swapCurrencies
  }
}