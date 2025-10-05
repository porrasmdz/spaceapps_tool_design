import { useState, useRef, useEffect } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { X, Grid3x3, Home, ArrowLeft } from "lucide-react";
import { DormSpriteIcon } from "./DormSpriteIcon"; // 🧩 Importamos el componente nuevo
import { StorageSpriteIcon } from "./StorageSpriteIcon";

interface PlacedFurniture {
  id: string;
  type: any;
  position: { x: number; y: number };
}

interface InteriorDesignerProps {
  modules: any[];
}

// Muebles y equipos realistas de hábitat espacial
const furnitureTypes = [
  // 🛌 Habitabilidad y descanso
  {
    id: "sleep-pod",
    name: "Módulo de Sueño Individual",
    category: "Dormitorio",
    description: "Cabina personal con aislamiento acústico y luz regulable",
    color: "border shadow-sm border-blue-500",
    icon: "🛏️",
    size: { width: 70, height: 40 },
  }, {
    id: "sleep-pod",
    name: "Módulo de Sueño Individual",
    category: "Centro Médico",
    description: "Cabina personal con aislamiento acústico y luz regulable",
    color: "border shadow-sm border-blue-500",
    icon: "🛏️",
    size: { width: 70, height: 40 },
  },
  {
    id: "personal-stowage",
    name: "Casillero Personal",
    category: "Dormitorio",
    description: "Compartimento hermético para pertenencias del astronauta",
    color: "border shadow-sm border-gray-500",
    icon: "🎒",
    size: { width: 40, height: 50 },
  },
  {
    id: "personal-stowage",
    name: "Casillero Personal",
    category: "Centro Médico",
    description: "Compartimento hermético para pertenencias del astronauta",
    color: "border shadow-sm border-gray-500",
    icon: "🎒",
    size: { width: 40, height: 50 },
  },
  {
    id: "privacy-curtain",
    name: "Cortina de Privacidad",
    category: "Dormitorio",
    description: "Panel retráctil para aislamiento visual y acústico",
    color: "border shadow-sm border-red-500",
    icon: "🪟",
    size: { width: 60, height: 5 },
  },
  {
    id: "privacy-curtain",
    name: "Cortina de Privacidad",
    category: "Centro Médico",
    description: "Panel retráctil para aislamiento visual y acústico",
    color: "border shadow-sm border-red-500",
    icon: "🪟",
    size: { width: 60, height: 5 },
  },
  {
    id: "hygiene-module",
    name: "Módulo de Higiene Personal",
    category: "Dormitorio",
    description: "Ducha de niebla y aseo compacto de bajo consumo de agua",
    color: "border shadow-sm border-cyan-500",
    icon: "🚿",
    size: { width: 60, height: 50 },
  },
  {
    id: "uwms",
    name: "Unidad de Manejo de Residuos (UWMS)",
    category: "Dormitorio",
    description: "Sistema de recolección y tratamiento de desechos",
    color: "border shadow-sm border-blue-400",
    icon: "🚽",
    size: { width: 50, height: 40 },
  },

  // 🧪 Laboratorio y estaciones de trabajo
  {
    id: "science-bench",
    name: "Mesa de Laboratorio Modular",
    category: "Laboratorio",
    description: "Superficie de trabajo con instrumentos integrados",
    color: "border shadow-sm border-amber-700",
    icon: "🧫",
    size: { width: 70, height: 50 },
  },
  {
    id: "analysis-station",
    name: "Estación de Análisis de Datos",
    category: "Laboratorio",
    description: "Consola con pantallas táctiles y sensores conectados",
    color: "border shadow-sm border-blue-500",
    icon: "💻",
    size: { width: 60, height: 40 },
  },
  {
    id: "sample-storage",
    name: "Contenedor de Muestras",
    category: "Laboratorio",
    description: "Unidad refrigerada para muestras biológicas o geológicas",
    color: "border shadow-sm border-blue-500",
    icon: "🧪",
    size: { width: 40, height: 40 },

  },
  {
    id: 'treadmill',
    name: 'Caminadora con Arnés',
    category: 'Módulo de Recreación',
    description: 'Ejercicio en microgravedad con sujeción dinámica',
    color: 'border shadow-sm border-purple-500',
    icon: '🏃‍♂️',
    size: { width: 60, height: 40 }
  },
  {
    id: 'vr-station',
    name: 'Estación de Realidad Virtual',
    category: 'Módulo de Recreación',
    description: 'Entretenimiento y terapia sensorial inmersiva',
    color: 'border shadow-sm border-purple-500',
    icon: '🎮',
    size: { width: 60, height: 40 }
  },

  {
    id: 'storage-rack',
    name: 'Rack de Almacenamiento',
    category: 'Almacén',
    description: 'Estructura modular para herramientas y suministros',
    color: 'border shadow-sm border-amber-600',
    icon: '📦',
    size: { width: 70, height: 40 }
  },
  {
    id: 'battery-pack',
    name: 'Módulo de Energía',
    category: 'Almacén',
    description: 'Batería recargable para respaldo energético',
    color: 'border shadow-sm border-yellow-500',
    icon: '🔋',
    size: { width: 60, height: 40 }
  },

  {
    id: 'galley-unit',
    name: 'Unidad de Cocina Compacta',
    category: 'Cocina',
    description: 'Incluye microondas, dispensador de agua y almacenamiento',
    color: 'border shadow-sm border-yellow-600',
    icon: '🍳',
    size: { width: 70, height: 50 }
  },
  {
    id: 'folding-table',
    name: 'Mesa Plegable Multifuncional',
    category: 'Cocina',
    description: 'Mesa ligera para comida o experimentos',
    color: 'border shadow-sm border-yellow-500',
    icon: '🍽️',
    size: { width: 60, height: 40 }
  },
  {
    id: 'food-storage',
    name: 'Almacenamiento de Alimentos',
    category: 'Cocina',
    description: 'Contenedor hermético con control térmico',
    color: 'border shadow-sm border-yellow-600',
    icon: '🥫',
    size: { width: 50, height: 50 }
  }

];


export function InteriorDesigner({ modules }: InteriorDesignerProps) {
  const [selectedModule, setSelectedModule] = useState<any>(null);
  const [placedFurniture, setPlacedFurniture] = useState<PlacedFurniture[]>([]);
  const [draggedFurniture, setDraggedFurniture] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [showGrid, setShowGrid] = useState(true);
  const [newFurnitureType, setNewFurnitureType] = useState<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSelectModule = (module: any) => {
    setSelectedModule(module);
    setPlacedFurniture([]);
  };

  const handleBackToModules = () => {
    setSelectedModule(null);
    setPlacedFurniture([]);
  };

  const handleMouseDown = (e: React.MouseEvent, furnitureId: string) => {
    e.preventDefault();
    const furniture = placedFurniture.find((f) => f.id === furnitureId);
    if (!furniture) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    setDraggedFurniture(furnitureId);
    setDragOffset({ x: offsetX, y: offsetY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!draggedFurniture || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const newX = e.clientX - containerRect.left - dragOffset.x;
    const newY = e.clientY - containerRect.top - dragOffset.y;

    setPlacedFurniture((furniture) =>
      furniture.map((f) =>
        f.id === draggedFurniture
          ? { ...f, position: { x: newX, y: newY } }
          : f
      )
    );
  };

  const handleMouseUp = () => {
    setDraggedFurniture(null);
    setDragOffset({ x: 0, y: 0 });
  };

  const handleDragStart = (furnitureType: any) => {
    setNewFurnitureType(furnitureType);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (!newFurnitureType || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const x =
      e.clientX - containerRect.left - newFurnitureType.size.width / 2;
    const y =
      e.clientY - containerRect.top - newFurnitureType.size.height / 2;

    const newFurniture = {
      id: `${newFurnitureType.id}-${Date.now()}`,
      type: newFurnitureType,
      position: { x, y },
    };

    setPlacedFurniture([...placedFurniture, newFurniture]);
    setNewFurnitureType(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleRemoveFurniture = (id: string) => {
    setPlacedFurniture(placedFurniture.filter((f) => f.id !== id));
  };

  useEffect(() => {
    if (draggedFurniture) {
      document.addEventListener("mouseup", handleMouseUp);
      return () => document.removeEventListener("mouseup", handleMouseUp);
    }
  }, [draggedFurniture]);

  // Vista de diseño interior
  if (!selectedModule) {
    return (
      <div className="space-y-6">
        <h2>Diseño Interior del Hábitat</h2>
        <p className="text-muted-foreground">
          Selecciona un módulo para diseñar su interior
        </p>

        {modules.length === 0 ? (
          <Card className="p-12 text-center">
            <Home className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3>No hay módulos disponibles</h3>
          </Card>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {modules.map((module) => (
              <Card
                key={module.id}
                className="p-6 cursor-pointer hover:shadow-lg"
                onClick={() => handleSelectModule(module)}
              >
                <h4>{module.type.name}</h4>
                <p className="text-sm text-muted-foreground">
                  {module.type.size?.width || 20}m²
                </p>
              </Card>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-12 gap-6 h-full">
      {/* Sidebar con muebles */}
      <div className="col-span-3 space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
        <Button variant="outline" className="w-full gap-2" onClick={handleBackToModules}>
          <ArrowLeft className="w-4 h-4" /> Volver a Módulos
        </Button>

        <Card className="p-4">
          <h4 className="mb-2">Módulo Actual</h4>
          <p className="text-sm text-muted-foreground">{selectedModule.type.name}</p>
        </Card>

        <div className="space-y-3">
          <h4>Muebles Disponibles</h4>
          {furnitureTypes
            .filter((f) => f.category === selectedModule.type.name)
            .map((furniture) => (
              <Card
                key={furniture.id}
                className={`p-3 cursor-grab active:cursor-grabbing ${furniture.color}`}
                draggable
                onDragStart={() => handleDragStart(furniture)}
              >
                <div className="flex items-center gap-2">
                  {/* 🌙 Cambiamos emoji por sprite solo si es dormitorio */}
                  {["Dormitorio", "Laboratorio", "Centro Médico"].includes(furniture.category) ? (
                    <DormSpriteIcon id={furniture.id} size={48} />
                  ) : (
                    <StorageSpriteIcon id={furniture.id} size={48} />
                  )}
                  <div>
                    <p className="text-sm font-medium">{furniture.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {furniture.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
        </div>
      </div>

      {/* Área de diseño */}
      <div className="col-span-9">
        <Card className="flex-1 overflow-hidden">
          <div
            ref={containerRef}
            className="relative w-48 h-full min-h-[500px] border shadow-sm border-slate-100"
            onMouseMove={handleMouseMove}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            {placedFurniture.map((furniture) => (
              <div
                key={furniture.id}
                className="absolute cursor-grab active:cursor-grabbing"
                style={{
                  left: furniture.position.x,
                  top: furniture.position.y,
                  width: furniture.type.size.width,
                  height: furniture.type.size.height,
                }}
                onMouseDown={(e) => handleMouseDown(e, furniture.id)}
              >
                <button
                  onClick={() => handleRemoveFurniture(furniture.id)}
                  className="absolute -top-2 -right-2 w-5 h-5 border border-red-500 rounded-full text-xs flex items-center justify-center z-10"
                >
                  <X className="w-3 h-3" />
                </button>

                <div className="flex items-center justify-center w-full h-full">
                  {["Dormitorio", "Laboratorio", "Centro Médico"].includes(furniture.type.category) ? (
                    <DormSpriteIcon id={furniture.type.id} size={80} />
                  ) : (
                    <StorageSpriteIcon id={furniture.type.id} size={80} />
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
