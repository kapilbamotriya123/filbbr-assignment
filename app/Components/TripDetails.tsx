import { ClockIcon, MapPinIcon, ShareIcon, StarIcon } from "lucide-react";





const TripDetails = ({itinerary}) => {

    


    const formatDate = (dateString: string) => {
        if (!dateString) return 'Flexible';
        return new Date(dateString).toLocaleDateString();
      };


    return (
        <div className="space-y-6">
           
          <div className="border-b pb-4">
            <h1 className="text-2xl font-bold">{itinerary.trip_title}</h1>
            <div className="flex gap-4 mt-2 text-gray-600">
              <span>🗓️ {formatDate(itinerary.month)}</span>
              <span>💰 {itinerary.budget}</span>
            </div>
          </div>

          {itinerary.days?.map((day) => (
            <div key={day.number} className="space-y-4">
              <h2 className="text-xl font-semibold">{day.title}</h2>
              
              <div className="grid grid-cols-1 gap-4">
                {day.entities.map((entity) => (
                  <div key={entity.id} className="border rounded-lg p-4 hover:shadow-lg transition">
                    <div className="flex items-start gap-3">
                      <img 
                        src={entity.icon} 
                        className="w-20 h-20 rounded-lg object-cover"
                        alt={entity.name}
                      />
                      <div className="flex-1">
                        <h3 className="font-medium">{entity.name}</h3>
                        <p className="text-sm text-gray-600">{entity.type}</p>
                        
                        <div className="flex items-center gap-1 mt-1">
                          <StarIcon className="w-4 h-4 text-yellow-400" />
                          <span>{entity.rating}</span>
                          <span className="text-gray-400">
                            ({entity.userRatingCount})
                          </span>
                        </div>

                        <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                          <MapPinIcon className="w-4 h-4" />
                          {entity.short_formatted_address}
                        </div>

                        {entity.commute_and_relaxation_time && (
                          <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                            <ClockIcon className="w-4 h-4" />
                            {entity.commute_and_relaxation_time}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {entity.why_this_entity && (
                      <p className="text-sm text-gray-600 mt-3 border-t pt-2">
                        {entity.why_this_entity}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
    )
}



export default TripDetails