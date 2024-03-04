import { FoodTruck } from "../types"

const FoodTruckCards = (truck:FoodTruck) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg mb-2">
      <div className="px-6 py-4 bg-gray-200">
        <div className="font-bold text-xl mb-2 text-cyan-600">{truck.applicant}</div>
        <p className="text-gray-700 text-base">{truck.optionaltext}</p>
        <p className="text-gray-700 text-base">Location:<span className="text-gray-700">{truck.location}</span></p>
        <p className="text-gray-700 text-base">Hours:<span className="text-gray-700">{`${truck.starttime} -${truck.endtime} `}</span></p>
      </div>
    </div>
  )
}

export default FoodTruckCards