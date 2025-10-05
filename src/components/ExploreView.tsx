import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { 
  ArrowLeft, 
  ArrowRight, 
  ArrowUp, 
  ArrowDown,
  RotateCcw,
  Home,
  MapPin,
  Info
} from "lucide-react";

interface ExploreViewProps {
  placedModules: any[];
}

export function ExploreView({ placedModules }: ExploreViewProps) {
  const [currentView, setCurrentView] = useState(0);
  const [viewDirection, setViewDirection] = useState(0); // 0: North, 1: East, 2: South, 3: West

  const interiorViews = [
    {
      id: "main-hub",
      name: "Centro Principal",
      description: "El corazón del hábitat donde se conectan todos los módulos",
      image: "https://images.unsplash.com/photo-1578878861446-27eaece72f8d?w=800&q=80",
      connections: ["laboratory", "greenhouse"]
    },
    {
      id: "laboratory",
      name: "Laboratorio de Investigación",
      description: "Área de trabajo científico y análisis de muestras marcianas",
      image: "../assets/greenhouse.jpg",
      connections: ["main-hub", "greenhouse"]
    },
    {
      id: "greenhouse",
      name: "Invernadero Hidropónico",
      description: "Sistema de cultivo de plantas para producción de alimentos y oxígeno",
      image: "../assets/greenhouse.jpg",
      connections: ["main-hub", "laboratory"]
    }
  ];

  const directionNames = ["Norte", "Este", "Sur", "Oeste"];
  const currentLocation = interiorViews[currentView];

  const navigateToRoom = (roomId: string) => {
    const roomIndex = interiorViews.findIndex(room => room.id === roomId);
    if (roomIndex !== -1) {
      setCurrentView(roomIndex);
    }
  };

  const rotateView = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      setViewDirection((prev) => (prev - 1 + 4) % 4);
    } else {
      setViewDirection((prev) => (prev + 1) % 4);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2>Exploración Virtual del Hábitat</h2>
        <p className="text-muted-foreground">
          Recorre el interior del hábitat espacial en vista de primera persona
        </p>
      </div>

      {/* Main Street View Container */}
      <Card className="relative overflow-hidden bg-black">
        {/* Main View */}
        <div className="relative h-[500px] md:h-[600px]">
          <img
            src={currentLocation.image}
            alt={currentLocation.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          
          {/* Overlay with location info */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
          
          {/* Navigation Controls Overlay */}
          <div className="absolute inset-0 flex items-center justify-between p-4">
            {/* Left Navigation */}
            <Button
              variant="secondary"
              size="icon"
              className="bg-black/50 backdrop-blur-sm text-white border-white/20 hover:bg-black/70"
              onClick={() => rotateView('left')}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>

            {/* Right Navigation */}
            <Button
              variant="secondary"
              size="icon"
              className="bg-black/50 backdrop-blur-sm text-white border-white/20 hover:bg-black/70"
              onClick={() => rotateView('right')}
            >
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Top UI */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="bg-black/50 backdrop-blur-sm text-white border-white/20">
                <MapPin className="w-3 h-3 mr-1" />
                {currentLocation.name}
              </Badge>
              <Badge variant="outline" className="bg-black/30 backdrop-blur-sm text-white border-white/20">
                Vista: {directionNames[viewDirection]}
              </Badge>
            </div>
            
            <Button
              variant="secondary"
              size="sm"
              className="bg-black/50 backdrop-blur-sm text-white border-white/20 hover:bg-black/70"
              onClick={() => setViewDirection(0)}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Centrar
            </Button>
          </div>

          {/* Bottom UI */}
          <div className="absolute bottom-4 left-4 right-4">
            <Card className="bg-black/80 backdrop-blur-sm border-white/20 p-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Home className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="text-white">{currentLocation.name}</h4>
                  <p className="text-sm text-white/70 mt-1">{currentLocation.description}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  <Info className="w-4 h-4 mr-2" />
                  Detalles
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </Card>

      {/* Room Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {interiorViews.map((room, index) => (
          <Card 
            key={room.id}
            className={`p-4 cursor-pointer transition-all hover:shadow-lg ${
              currentView === index ? 'ring-2 ring-primary bg-primary/5' : ''
            }`}
            onClick={() => setCurrentView(index)}
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-gradient-to-br from-slate-700 to-slate-900">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="truncate">{room.name}</h4>
                <p className="text-sm text-muted-foreground">
                  {currentView === index ? 'Ubicación actual' : 'Navegar aquí'}
                </p>
              </div>
              {currentView === index && (
                <div className="w-2 h-2 rounded-full bg-primary" />
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Movement Controls */}
      <Card className="p-6">
        <h3 className="mb-4">Controles de Navegación</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="mb-3">Movimiento</h4>
            <div className="grid grid-cols-3 gap-2 max-w-[120px]">
              <div></div>
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => {/* Move forward */}}
              >
                <ArrowUp className="w-4 h-4" />
              </Button>
              <div></div>
              
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => rotateView('left')}
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => {/* Move back */}}
              >
                <ArrowDown className="w-4 h-4" />
              </Button>
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => rotateView('right')}
              >
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div>
            <h4 className="mb-3">Conexiones Disponibles</h4>
            <div className="space-y-2">
              {currentLocation.connections.map((connectionId) => {
                const connectedRoom = interiorViews.find(room => room.id === connectionId);
                if (!connectedRoom) return null;
                
                return (
                  <Button
                    key={connectionId}
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => navigateToRoom(connectionId)}
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    Ir a {connectedRoom.name}
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      </Card>

      {/* Module Status */}
      {placedModules.length > 0 && (
        <Card className="p-6">
          <h3 className="mb-4">Estado de Módulos Diseñados</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {placedModules.slice(0, 3).map((module) => (
              <div key={module.id} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm truncate">{module.type.name}</p>
                  <p className="text-xs text-muted-foreground">Operacional</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}