import { Planet, ModuleType } from "../data/planets";
import { PlanetSelector } from "./PlanetSelector";
import { ModulePanel } from "./ModulePanel";
import { HabitatViewer } from "./HabitatViewer";
import { ChatbotAssistant } from "./ChatbotAssistant";
import { HealthMonitor } from "./HealthMonitor";
import { EnvironmentalWidget } from "./EnvironmentalWidget";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface DesignerViewProps {
  planets: Planet[];
  moduleTypes: ModuleType[];
  plantDatabase: any[];
  selectedPlanet: Planet;
  onSelectPlanet: (planet: Planet) => void;
  placedModules: any[];
  onAddModule: (module: ModuleType) => void;
  onRemoveModule: (id: string) => void;
  totalResources: any;
  totalCapacity: number;
}

export function DesignerView({
  planets,
  moduleTypes,
  plantDatabase,
  selectedPlanet,
  onSelectPlanet,
  placedModules,
  onAddModule,
  onRemoveModule,
  totalResources,
  totalCapacity
}: DesignerViewProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2>Diseño Interior del Hábitat</h2>
        <p className="text-muted-foreground">
          Configura los módulos internos, gestiona recursos y optimiza el espacio interior
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Sidebar */}
        <div className="lg:col-span-3 space-y-6">
          <PlanetSelector
            planets={planets}
            selectedPlanet={selectedPlanet}
            onSelectPlanet={onSelectPlanet}
          />

          <Tabs defaultValue="modules" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="modules">Módulos</TabsTrigger>
              <TabsTrigger value="health">Salud</TabsTrigger>
            </TabsList>
            
            <TabsContent value="modules" className="mt-4">
              <ModulePanel
                modules={moduleTypes}
                onAddModule={onAddModule}
              />
            </TabsContent>
            
            <TabsContent value="health" className="mt-4">
              <HealthMonitor />
            </TabsContent>
          </Tabs>
        </div>

        {/* Center - Habitat Viewer */}
        <div className="lg:col-span-6 space-y-6">
          <EnvironmentalWidget planet={selectedPlanet} />
          
          <HabitatViewer
            modules={placedModules}
            onRemoveModule={onRemoveModule}
            totalResources={totalResources}
            totalCapacity={totalCapacity}
          />
        </div>

        {/* Right Sidebar - Chatbot */}
        <div className="lg:col-span-3 h-[600px] lg:h-auto">
          <ChatbotAssistant
            selectedPlanet={selectedPlanet}
            modules={placedModules}
            totalResources={totalResources}
            totalCapacity={totalCapacity}
            plantDatabase={plantDatabase}
          />
        </div>
      </div>
    </div>
  );
}
