import Image from "next/image";
import tripImage from '../../../assets/utah-5641320_640.jpg'
import TripDetails from "../../../Components/TripDetails"
import { fetchItinerary, shareTrip } from "@/app/services/ItenaryService";


interface SharePageProps {
    params: {
        id: string 
    }
}

const ItinerarySharePage = async ({params: {id}}: SharePageProps) => {

    const itinerary = await fetchItinerary(id);

    return (
        <div className='flex p-10'>
            <div>
            <div className="border relative p-4 h-[80%] max-h-lvh overflow-y-auto gap-1 flex items-center justify-center rounded-lg shadow-lg">
                <div className="w-1/2 h-full">
                    <Image src={tripImage} alt="trip" className="w-full h-full object-cover" width={400} height={300}/>
                </div>
                <div className="w-1/2 h-full overflow-y-auto">
                    <TripDetails itinerary={itinerary} />
                </div>
            </div>
            <p>Copy Link</p>
            </div>
        </div>
    );
};

export default ItinerarySharePage;