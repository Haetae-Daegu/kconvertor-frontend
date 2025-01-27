import { useState } from "react"
import axios from 'axios';
import { format } from "date-fns";

const API_URL = process.env.NEXT_PUBLIC_API_URL


export const useGraphData = () => {
  const [graphData, setGraphData] = useState([])
  const [error, setError] = useState(null)
  const handleData = async () => {
    try {
      const response = await axios.get(`${API_URL}/graph/`)
      const data = response.data.map((item, i) => {
        const [day, month, year] = item.date.split("/");
        const formattedDate = `${year}-${month}-${day}`;
        const dayFormatted = format(new Date(formattedDate), "dd MMM yyyy");
        
        item.id = i + 1;
        return { ...item, day: dayFormatted };
      });
      setError(null)
      setGraphData(data)
    } catch (err) {
      if (err.response) {
        const status = err.response.status
        if (status === 500) {
          setError("Internal server error: Please try again later.");
        } else {
          setError(`Error ${err.response.status}: ${err.response.message}`);
        }
      } else if (err.request) {
        setError("Service unavailable. Please try again later.")
      } else {
        console.log(err)
        setError("An unexpected error occurred. Please try again.");
      }
    }
  }
  
  
  return {
    graphData,
    handleData,
    error,
  }
}