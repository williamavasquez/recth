import { Dispatch } from "react";
import { FoodTruck } from "../types";

interface Props {
  reset: Dispatch<React.SetStateAction<FoodTruck[]>>;
}

const ResetButton: React.FC<Props> = ({ reset }) => {

  return (
    <button
      onClick={() => reset([])}
      className="fixed bottom-20 right-10 z-50 bg-cyan-600 hover:bg-cyan-900 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
    >
      <svg
        className="h-9 w-5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <svg
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6">

          <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
        </svg>
      </svg>
    </button>
  )
}

export default ResetButton;