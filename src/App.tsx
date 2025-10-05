import { useState } from "react";
import { planets, moduleTypes, plantDatabase } from "./data/planets";
import { HomeView } from "./components/HomeView";
import { PhysicalLayout } from "./components/PhysicalLayout";
import { InteriorDesigner } from "./components/InteriorDesigner";
import { ExploreView } from "./components/ExploreView";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Rocket, Home, Map, LayoutGrid, Compass } from "lucide-react";

export default function App() {
  const [selectedPlanet, setSelectedPlanet] = useState(planets[0]);
  const [placedModules, setPlacedModules] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("home");

  const handleAddModule = (moduleType: any) => {
    // Position modules in center for physical layout
    const centerX = 450;
    const centerY = 300;
    const randomOffset = () => (Math.random() - 0.5) * 100;
    
    const newModule = {
      id: `${moduleType.id}-${Date.now()}`,
      type: moduleType,
      position: { 
        x: centerX + randomOffset(), 
        y: centerY + randomOffset() 
      }
    };
    setPlacedModules([...placedModules, newModule]);
  };

  const handleRemoveModule = (id: string) => {
    setPlacedModules(placedModules.filter(m => m.id !== id));
  };

  const handleUpdateModule = (id: string, position: { x: number; y: number }) => {
    setPlacedModules(modules => 
      modules.map(m => m.id === id ? { ...m, position } : m)
    );
  };

  const totalResources = placedModules.reduce(
    (acc, module) => ({
      o2: acc.o2 + module.type.resources.o2,
      h2o: acc.h2o + module.type.resources.h2o,
      food: acc.food + module.type.resources.food,
      energy: acc.energy + module.type.resources.energy
    }),
    { o2: 0, h2o: 0, food: 0, energy: 0 }
  );

  const totalCapacity = placedModules.reduce(
    (acc, module) => acc + module.type.capacity,
    0
  );

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-[1800px] mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
            <Rocket className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1>Diseñador de Hábitats Espaciales</h1>
            <p className="text-muted-foreground">Sistema interactivo de planificación y gestión de recursos</p>
          </div>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-2xl grid-cols-4">
            <TabsTrigger value="home" className="gap-2">
              <Home className="w-4 h-4" />
              Home
            </TabsTrigger>
            <TabsTrigger value="layout" className="gap-2">
              <Map className="w-4 h-4" />
              Layout
            </TabsTrigger>
            <TabsTrigger value="design" className="gap-2">
              <LayoutGrid className="w-4 h-4" />
              Design
            </TabsTrigger>
            <TabsTrigger value="explore" className="gap-2">
              <Compass className="w-4 h-4" />
              Explore
            </TabsTrigger>
          </TabsList>

          <TabsContent value="home" className="mt-6">
            <HomeView
              selectedPlanet={selectedPlanet}
              placedModules={placedModules}
              totalCapacity={totalCapacity}
              onTabChange={setActiveTab}
            />
          </TabsContent>

          <TabsContent value="layout" className="mt-6">
            <PhysicalLayout
              modules={placedModules}
              onUpdateModule={handleUpdateModule}
              onRemoveModule={handleRemoveModule}
              selectedPlanet={selectedPlanet}
            />
          </TabsContent>

          <TabsContent value="design" className="mt-6">
            <InteriorDesigner
              modules={placedModules.filter(m => m.type.isEditable)}
            />
          </TabsContent>

          <TabsContent value="explore" className="mt-6">
            <ExploreView
              placedModules={placedModules}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
