import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { MapPin, Clock, Users, Star, Calendar as CalendarIcon, Ticket, Camera, Heart } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";

interface FamilyPlace {
  id: number;
  name: string;
  description: string;
  location: string;
  category: string;
  rating: number;
  price: number;
  duration: string;
  imageUrl: string;
  familyFriendly: boolean;
  ageGroups: string[];
  availableSlots: string[];
}

const familyPlaces: FamilyPlace[] = [
  {
    id: 1,
    name: "Adventure Park Family Fun Zone",
    description: "Experience thrilling rides, mini golf, and arcade games perfect for all ages. Create lasting memories with your family!",
    location: "Central Park District",
    category: "Adventure",
    rating: 4.8,
    price: 35,
    duration: "Full Day",
    imageUrl: "/api/placeholder/400/250",
    familyFriendly: true,
    ageGroups: ["Children (3-12)", "Teens (13-17)", "Adults"],
    availableSlots: ["9:00 AM", "11:00 AM", "2:00 PM", "4:00 PM"]
  },
  {
    id: 2,
    name: "Nature Discovery Museum",
    description: "Interactive exhibits showcasing local wildlife, hands-on science experiments, and educational tours for curious minds.",
    location: "Museum Quarter",
    category: "Educational",
    rating: 4.6,
    price: 25,
    duration: "4 hours",
    imageUrl: "/api/placeholder/400/250",
    familyFriendly: true,
    ageGroups: ["Children (5+)", "Teens", "Adults"],
    availableSlots: ["10:00 AM", "1:00 PM", "3:30 PM"]
  },
  {
    id: 3,
    name: "Grandparents' Heritage Garden",
    description: "Beautiful botanical garden with wheelchair accessibility, storytelling areas, and intergenerational activities.",
    location: "Heritage District",
    category: "Nature",
    rating: 4.9,
    price: 15,
    duration: "2-3 hours",
    imageUrl: "/api/placeholder/400/250",
    familyFriendly: true,
    ageGroups: ["All Ages", "Seniors", "Children"],
    availableSlots: ["9:30 AM", "11:30 AM", "2:30 PM", "4:30 PM"]
  },
  {
    id: 4,
    name: "Family Cooking Studio",
    description: "Learn to cook traditional recipes together! Professional chefs guide families through fun, hands-on cooking experiences.",
    location: "Culinary Arts Center",
    category: "Culinary",
    rating: 4.7,
    price: 45,
    duration: "3 hours",
    imageUrl: "/api/placeholder/400/250",
    familyFriendly: true,
    ageGroups: ["Children (8+)", "Teens", "Adults"],
    availableSlots: ["10:00 AM", "2:00 PM", "6:00 PM"]
  }
];

export default function FamilyOutings() {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [bookingPlace, setBookingPlace] = useState<FamilyPlace | null>(null);
  const [bookingDetails, setBookingDetails] = useState({
    timeSlot: "",
    participants: 1,
    specialRequests: ""
  });

  const categories = ["all", "Adventure", "Educational", "Nature", "Culinary"];
  
  const filteredPlaces = familyPlaces.filter(place => 
    selectedCategory === "all" || place.category === selectedCategory
  );

  const handleBooking = () => {
    if (!bookingPlace || !bookingDetails.timeSlot) {
      toast({
        title: "Incomplete Booking",
        description: "Please select a time slot to complete your booking.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Booking Confirmed!",
      description: `Your family outing to ${bookingPlace.name} has been booked for ${bookingDetails.timeSlot}.`,
    });

    setBookingPlace(null);
    setBookingDetails({ timeSlot: "", participants: 1, specialRequests: "" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-[hsl(var(--kinnren-pink))] bg-clip-text text-transparent">
            Family Outings
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Book memorable experiences at family-friendly places. Create lasting bonds across generations.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1">
            <Label htmlFor="category">Category</Label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Adventure">Adventure</SelectItem>
                <SelectItem value="Educational">Educational</SelectItem>
                <SelectItem value="Nature">Nature</SelectItem>
                <SelectItem value="Culinary">Culinary</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Places Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlaces.map((place) => (
            <Card key={place.id} className="overflow-hidden hover:shadow-lg transition-all duration-200">
              <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                <Camera className="h-12 w-12 text-muted-foreground" />
              </div>
              
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">{place.name}</CardTitle>
                  <Badge variant="secondary" className="ml-2">
                    {place.category}
                  </Badge>
                </div>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                    {place.rating}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {place.location}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <CardDescription className="text-sm">
                  {place.description}
                </CardDescription>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-muted-foreground">
                    <Clock className="h-4 w-4 mr-1" />
                    {place.duration}
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Users className="h-4 w-4 mr-1" />
                    {place.ageGroups.length} age groups
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-primary">
                    ${place.price}
                    <span className="text-sm font-normal text-muted-foreground">/person</span>
                  </div>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        className="kinnren-gradient text-white border-0"
                        onClick={() => setBookingPlace(place)}
                      >
                        <Ticket className="h-4 w-4 mr-2" />
                        Book Now
                      </Button>
                    </DialogTrigger>

                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Book Family Outing</DialogTitle>
                        <DialogDescription>
                          Reserve your spot at {place.name}
                        </DialogDescription>
                      </DialogHeader>

                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="timeSlot">Available Time Slots</Label>
                          <Select 
                            value={bookingDetails.timeSlot} 
                            onValueChange={(value) => setBookingDetails(prev => ({ ...prev, timeSlot: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select time slot" />
                            </SelectTrigger>
                            <SelectContent>
                              {place.availableSlots.map((slot) => (
                                <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="participants">Number of Participants</Label>
                          <Input
                            id="participants"
                            type="number"
                            min="1"
                            max="20"
                            value={bookingDetails.participants}
                            onChange={(e) => setBookingDetails(prev => ({ 
                              ...prev, 
                              participants: parseInt(e.target.value) || 1 
                            }))}
                          />
                        </div>

                        <div className="p-4 bg-muted/50 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <span>Total Cost:</span>
                            <span className="text-2xl font-bold text-primary">
                              ${place.price * bookingDetails.participants}
                            </span>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {bookingDetails.participants} × ${place.price} per person
                          </div>
                        </div>

                        <Button 
                          onClick={handleBooking}
                          className="w-full kinnren-gradient text-white border-0"
                        >
                          <Heart className="h-4 w-4 mr-2" />
                          Confirm Family Outing
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredPlaces.length === 0 && (
          <div className="text-center py-12">
            <Camera className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No places found</h3>
            <p className="text-muted-foreground">Try adjusting your filters to see more family-friendly places.</p>
          </div>
        )}
      </div>
    </div>
  );
}