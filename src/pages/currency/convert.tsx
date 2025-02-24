import { useState } from "react";
import { useCurrencyConvertor } from "@/hooks/useCurrencyConverter";
import InputField from "@/components/InputField";
import CurrencySelector from "@/components/CurrencySelector";
import ResultDisplay from "@/components/ResultDisplay";
import ErrorPanel from "@/components/ErrorPanel";
import { FaCoins } from "react-icons/fa";
import ToggleButton from "@/components/ToggleButton";

const Convert = () => {
  const {
    amount,
    setAmount,
    fromCurrency,
    setFromCurrency,
    toCurrency,
    setToCurrency,
    result,
    error,
    handleConvert,
    swapCurrencies,
  } = useCurrencyConvertor();

  const [isVisible, setIsVisible] = useState(true);

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <div className="mx-auto max-w-3xl flex flex-col gap-6 rounded-3xl bg-white p-6 shadow-3xl md:p-8">
      <div className="flex items-center justify-between">
        <FaCoins className="text-blue-700 text-3xl" />
        <h2 className="text-xl font-bold text-gray-800">
          Currency Convertor
        </h2>
        <ToggleButton isVisible={isVisible} onToggle={toggleVisibility} className={""} />
      </div>

      {isVisible && (
        <div className="flex flex-col gap-4">
          <InputField
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            placeholder="Enter amount"
          />

          <div className="flex gap-4 items-center">
            <CurrencySelector
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              options={["EUR", "KRW"]}
            />
            <button
              onClick={swapCurrencies}
              className="rounded-lg bg-blue-500 p-2 hover:bg-gray-300"
            >
              ⇆
            </button>
            <CurrencySelector
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              options={["EUR", "KRW"]}
            />
          </div>
          <button
            className="rounded-lg bg-blue-500 px-6 py-3 text-white hover:bg-blue-600"
            onClick={handleConvert}
          >
            Convert
          </button>
        </div>
      )}

      {isVisible && (result !== null && error === null && (
        <ResultDisplay
          amount={amount}
          fromCurrency={fromCurrency}
          result={result}
          toCurrency={toCurrency}
        />
      ))}

      {isVisible && (error && <ErrorPanel message={error} />)}
    </div>
  );
};

export default Convert;
