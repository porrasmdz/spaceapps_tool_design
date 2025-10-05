import { ModuleType } from "../data/planets";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Briefcase, Bed, Utensils, Sprout, HeartPulse, Users, Zap, Droplets, Apple, Wind } from "lucide-react";

interface ModulePanelProps {
  modules: ModuleType[];
  onAddModule: (module: ModuleType) => void;
}

const iconMap: Record<string, any> = {
  briefcase: Briefcase,
  bed: Bed,
  utensils: Utensils,
  sprout: Sprout,
  "heart-pulse": HeartPulse
};

export function ModulePanel({ modules, onAddModule }: ModulePanelProps) {
  return (
    <div className="space-y-4">
      <h2>Estructuras Modulares</h2>
      
      <div className="space-y-3">
        {modules.map((module) => {
          const Icon = iconMap[module.icon];
          return (
            <Card key={module.id} className="p-4 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-2 flex-1 min-w-0">
                  <Icon className="w-5 h-5 mt-0.5 flex-shrink-0 text-primary" />
                  <div className="flex-1 min-w-0">
                    <h3>{module.name}</h3>
                    <p className="text-sm text-muted-foreground">{module.description}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="text-xs">
                  <Users className="w-3 h-3 mr-1" />
                  {module.capacity} pers.
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  <Wind className="w-3 h-3 mr-1" />
                  {module.resources.o2 > 0 ? '+' : ''}{module.resources.o2} O₂
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  <Droplets className="w-3 h-3 mr-1" />
                  {module.resources.h2o} H₂O
                </Badge>
                {module.resources.food !== 0 && (
                  <Badge variant="secondary" className="text-xs">
                    <Apple className="w-3 h-3 mr-1" />
                    {module.resources.food > 0 ? '+' : ''}{module.resources.food} Food
                  </Badge>
                )}
                <Badge variant="secondary" className="text-xs">
                  <Zap className="w-3 h-3 mr-1" />
                  {module.resources.energy} kW
                </Badge>
              </div>

              <button
                onClick={() => onAddModule(module)}
                className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Agregar Módulo
              </button>
            </Card>
          );
        })}
      </div>

      <Card className="p-4 bg-muted/50">
        <p className="text-sm text-muted-foreground">
          💡 <strong>Tip:</strong> Los valores negativos en recursos indican producción. 
          Por ejemplo, -50 O₂ significa que el módulo produce 50 unidades de oxígeno.
        </p>
      </Card>
    </div>
  );
}
