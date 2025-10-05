import { Planet } from "../data/planets";
import { Card } from "./ui/card";
import { Thermometer, Gauge, Radiation, Moon } from "lucide-react";

interface EnvironmentalWidgetProps {
  planet: Planet | null;
}

export function EnvironmentalWidget({ planet }: EnvironmentalWidgetProps) {
  if (!planet) return null;

  return (
    <Card className="p-4 space-y-3">
      <div className="flex items-center gap-2">
        <div
          className="w-4 h-4 rounded-full"
          style={{ backgroundColor: planet.color }}
        />
        <h3>{planet.name}</h3>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <Thermometer className="w-4 h-4 text-orange-500" />
            <span className="text-muted-foreground">Temp.</span>
          </div>
          <span>{planet.temperature}</span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <Gauge className="w-4 h-4 text-blue-500" />
            <span className="text-muted-foreground">Presión</span>
          </div>
          <span>{planet.pressure}</span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <Radiation className="w-4 h-4 text-yellow-500" />
            <span className="text-muted-foreground">Radiación</span>
          </div>
          <span>{planet.radiation.split('(')[0]}</span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <Moon className="w-4 h-4 text-purple-500" />
            <span className="text-muted-foreground">Gravedad</span>
          </div>
          <span>{planet.gravity.split('(')[0]}</span>
        </div>
      </div>
    </Card>
  );
}
