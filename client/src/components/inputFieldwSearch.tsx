import { FC } from "react";

interface Props {
  btnText: string;
  btnValue: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onclick: () => void;
  isDisabled?: boolean;
}
const InputFieldWithButton: FC<Props> = ({ btnText, onclick, btnValue, handleInputChange, isDisabled }) => {
  return (
    <div className="relative">
      <input
        value={btnValue}
        onChange={(e) => { handleInputChange(e) }}
        className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Address where you looking" required />
      <button
        disabled={isDisabled}
        onClick={onclick}
        className="text-white absolute end-2.5 bottom-2.5 bg-cyan-700 hover:bg-cyan-800 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800">{btnText}</button>
    </div>
  )
}

export default InputFieldWithButton