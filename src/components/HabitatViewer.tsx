import { ModuleType } from "../data/planets";
import { X, Maximize2, Users, Wind, Droplets, Apple, Zap } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";

interface PlacedModule {
  id: string;
  type: ModuleType;
  position: { x: number; y: number };
}

interface HabitatViewerProps {
  modules: PlacedModule[];
  onRemoveModule: (id: string) => void;
  totalResources: {
    o2: number;
    h2o: number;
    food: number;
    energy: number;
  };
  totalCapacity: number;
}

const iconMap: Record<string, string> = {
  briefcase: "💼",
  bed: "🛏️",
  utensils: "🍴",
  sprout: "🌱",
  "heart-pulse": "❤️"
};

export function HabitatViewer({ modules, onRemoveModule, totalResources, totalCapacity }: HabitatViewerProps) {
  return (
    <div className="space-y-4 h-full flex flex-col">
      <div className="flex items-center justify-between">
        <h2>Visualización del Hábitat</h2>
        <Badge variant="outline">
          <Maximize2 className="w-3 h-3 mr-1" />
          {modules.length} módulos
        </Badge>
      </div>

      {/* Habitat Canvas */}
      <Card className="flex-1 min-h-[400px] bg-gradient-to-br from-slate-900 to-slate-800 relative overflow-hidden">
        {/* Grid background */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }} />

        {/* Stars background */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.7 + 0.3
              }}
            />
          ))}
        </div>

        {/* Modules */}
        <div className="relative h-full p-6">
          {modules.length === 0 ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-white/50 text-center">
                Agrega módulos desde el panel lateral<br />
                para comenzar a diseñar tu hábitat
              </p>
            </div>
          ) : (
            <div className="flex flex-wrap gap-4 items-start">
              {modules.map((module, index) => (
                <div
                  key={module.id}
                  className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 hover:bg-white/20 transition-all group"
                  style={{
                    width: `${module.type.size.width}px`,
                    minHeight: `${module.type.size.height}px`
                  }}
                >
                  <button
                    onClick={() => onRemoveModule(module.id)}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <div className="text-center space-y-2">
                    <div className="text-4xl">{iconMap[module.type.icon]}</div>
                    <p className="text-sm text-white">{module.type.name}</p>
                    <div className="flex flex-wrap gap-1 justify-center text-xs">
                      <Badge variant="secondary" className="text-xs">
                        <Users className="w-3 h-3 mr-1" />
                        {module.type.capacity}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>

      {/* Resource Summary */}
      <Card className="p-4">
        <h3 className="mb-3">Resumen de Recursos</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <div className="text-center p-3 rounded-lg bg-muted">
            <Users className="w-5 h-5 mx-auto mb-1 text-purple-500" />
            <p className="text-sm text-muted-foreground">Capacidad</p>
            <p className="font-medium">{totalCapacity}</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-muted">
            <Wind className="w-5 h-5 mx-auto mb-1 text-blue-500" />
            <p className="text-sm text-muted-foreground">O₂ neto</p>
            <p className={`font-medium ${totalResources.o2 < 0 ? 'text-green-600' : 'text-destructive'}`}>
              {totalResources.o2 > 0 ? '+' : ''}{totalResources.o2}
            </p>
          </div>
          <div className="text-center p-3 rounded-lg bg-muted">
            <Droplets className="w-5 h-5 mx-auto mb-1 text-cyan-500" />
            <p className="text-sm text-muted-foreground">H₂O</p>
            <p className="font-medium">{totalResources.h2o}</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-muted">
            <Apple className="w-5 h-5 mx-auto mb-1 text-red-500" />
            <p className="text-sm text-muted-foreground">Comida</p>
            <p className={`font-medium ${totalResources.food < 0 ? 'text-green-600' : 'text-orange-600'}`}>
              {totalResources.food > 0 ? '+' : ''}{totalResources.food}
            </p>
          </div>
          <div className="text-center p-3 rounded-lg bg-muted">
            <Zap className="w-5 h-5 mx-auto mb-1 text-yellow-500" />
            <p className="text-sm text-muted-foreground">Energía</p>
            <p className="font-medium">{totalResources.energy} kW</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
