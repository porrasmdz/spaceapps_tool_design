import { Planet } from "../data/planets";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Globe, Thermometer, Gauge, Radiation, Moon } from "lucide-react";

interface PlanetSelectorProps {
  planets: Planet[];
  selectedPlanet: Planet | null;
  onSelectPlanet: (planet: Planet) => void;
}

export function PlanetSelector({ planets, selectedPlanet, onSelectPlanet }: PlanetSelectorProps) {
  return (
    <div className="space-y-4">
      <h2 className="flex items-center gap-2">
        <Globe className="w-5 h-5" />
        Seleccionar Planeta
      </h2>
      
      <div className="grid grid-cols-2 gap-3">
        {planets.map((planet) => (
          <button
            key={planet.id}
            onClick={() => onSelectPlanet(planet)}
            className={`p-4 rounded-lg border-2 transition-all text-left ${
              selectedPlanet?.id === planet.id
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/50"
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <div
                className="w-6 h-6 rounded-full"
                style={{ backgroundColor: planet.color }}
              />
              <span className="font-medium">{planet.name}</span>
            </div>
            <p className="text-sm text-muted-foreground">{planet.description}</p>
          </button>
        ))}
      </div>

      {selectedPlanet && (
        <Card className="p-4 space-y-3">
          <h3 className="flex items-center gap-2">
            Condiciones Ambientales
          </h3>
          
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <Thermometer className="w-4 h-4 mt-0.5 text-orange-500 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm">Temperatura</p>
                <p className="text-sm text-muted-foreground">{selectedPlanet.temperature}</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Gauge className="w-4 h-4 mt-0.5 text-blue-500 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm">Presión Atmosférica</p>
                <p className="text-sm text-muted-foreground">{selectedPlanet.pressure}</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Radiation className="w-4 h-4 mt-0.5 text-yellow-500 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm">Radiación</p>
                <p className="text-sm text-muted-foreground">{selectedPlanet.radiation}</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Moon className="w-4 h-4 mt-0.5 text-purple-500 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm">Gravedad</p>
                <p className="text-sm text-muted-foreground">{selectedPlanet.gravity}</p>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
