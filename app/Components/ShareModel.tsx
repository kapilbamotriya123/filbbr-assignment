import Image from "next/image";
import tripImage from '../assets/utah-5641320_640.jpg'
import TripDetails from "./TripDetails";

const ShareModel = ({itinerary, onShareClose}) => {
    return (
        <div className="fixed inset-0 flex  items-center justify-center h-full w-full bg-black/80 bg-opacity-50">
                <div className="absolute text-4xl font-bold top-2 right-2 cursor-pointer" onClick={onShareClose}>X</div>
            <div className="border relative p-4 w-[80%] h-[50%] gap-1 flex items-center justify-center rounded-lg shadow-lg">
                <div className="w-1/2 h-full">
                    <Image src={tripImage} alt="trip" className="w-full h-full object-cover" width={400} height={300}/>
                </div>
                <div className="w-1/2 h-full overflow-y-auto">
                    <TripDetails itinerary={itinerary} />
                </div>
            </div>
        </div>
    );
}

export default ShareModel;