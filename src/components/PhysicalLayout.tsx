import { useState, useRef, useEffect } from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import marsBg from "../assets/mars.jpg";
import {

  X,
  Droplets,
  Utensils,
  Zap,
  Users,
  Wind,
  FlaskConical,
  Sun
} from "lucide-react";
import { SpriteIcon } from "./SpriteIcon";

const SPRITE_SCALE = 12;
interface PlacedModule {
  id: string;
  type: any;
  position: { x: number; y: number };
}

interface PhysicalLayoutProps {
  modules: PlacedModule[];
  onUpdateModule: (id: string, position: { x: number; y: number }) => void;
  onRemoveModule: (id: string) => void;
  selectedPlanet: any;
}

const availableModules = [
  {
    id: 'greenhouse',
    name: 'Incubadora de Plantas',
    subtitle: 'Producción de alimentos, oxígeno y biomasa',
    description:
      'Módulo de cultivo hidropónico de 40 m². Produce hasta 40 L de O₂ y 10 kg de alimentos al día usando luz LED y reciclaje de CO₂.',
    color: 'border border-green-500',
    energy: -30,
    capacity: 0,
    water: -20,
    oxygen: 40,
    food: 10,
    size: { width: 5, height: 8 },
    isEditable: false,

    icon: '🌱'
  },
  {
    id: 'water-extractor',
    name: 'Extractor de Agua',
    subtitle: 'Extracción de hielo marciano y purificación',
    description:
      'Unidad subterránea compacta (6x8 m) que perfora el suelo para obtener hielo marciano y lo purifica, generando unos 20 L diarios de agua utilizable.',
    color: 'border border-blue-500',
    energy: -10,
    capacity: 0,
    water: 20,
    oxygen: -5,
    food: 0,
    size: { width: 6, height: 8 },

    isEditable: false,
    icon: '💧'
  },
  {
    id: 'solar-plant',
    name: 'Planta Solar',
    subtitle: 'Generación de energía eléctrica',
    description:
      'Campo fotovoltaico de 50 m² de paneles desplegables. Genera hasta 90 kW en condiciones óptimas de iluminación marciana.',
    color: 'border border-orange-500',
    energy: 90,
    capacity: 0,
    water: 0,
    oxygen: -5,
    food: 0,
    size: { width: 5, height: 10 },

    isEditable: false,
    icon: '☀️'
  },
  {
    id: 'laboratory',
    name: 'Laboratorio',
    subtitle: 'Investigación y desarrollo científico',
    description:
      'Módulo presurizado (8x12 m) equipado para experimentos biológicos y de materiales. Requiere alto consumo energético para instrumentación.',
    color: 'border border-purple-500',
    energy: -10,
    capacity: 0,
    water: -5,
    oxygen: -5,
    food: 0,
    size: { width: 8, height: 12 },

    isEditable: true,
    icon: '🧪'
  },
  {
    id: 'dormitory',
    name: 'Dormitorio',
    subtitle: 'Descanso y habitabilidad',
    description:
      'Área habitable de 60 m² con cabinas presurizadas para 4 astronautas. Incluye zonas de descanso, aseo y aislamiento acústico.',
    color: 'border border-indigo-500',
    energy: -10,
    capacity: 4,
    water: 0,
    oxygen: -10,
    food: 0,
    size: { width: 6, height: 10 },

    isEditable: true,
    icon: '🛏️'
  },
  {
    id: 'kitchen',
    name: 'Cocina',
    subtitle: 'Preparación y conservación de alimentos',
    description:
      'Espacio funcional de 40 m² con hornos sellados, impresora de alimentos 3D y almacenamiento térmico. Requiere agua purificada y energía constante.',
    color: 'border border-yellow-500',
    energy: -10,
    capacity: 0,
    water: -10,
    oxygen: -5,
    food: 0,
    size: { width: 5, height: 8 },

    isEditable: true,
    icon: '🍽️'
  },
  {
    id: 'recycling-plant',
    name: 'Planta Recicladora',
    subtitle: 'Gestión de residuos y reciclaje de agua',
    description:
      'Instalación de 110 m² que procesa desechos orgánicos y aguas grises. Recupera hasta el 85% del agua usada y filtra CO₂ residual.',
    color: 'border border-teal-500',
    energy: -10,
    capacity: 0,
    water: -5,
    oxygen: -5,
    food: 0,
    size: { width: 8, height: 14 },

    isEditable: false,
    icon: '♻️'
  },
  {
    id: 'waste-storage',
    name: 'Depósito de Basura',
    subtitle: 'Almacenamiento temporal de residuos',
    description:
      'Pequeño contenedor presurizado (30 m²) para almacenar residuos sólidos y materiales no reciclables antes de su procesamiento.',
    color: 'border border-gray-500',
    energy: -10,
    capacity: 0,
    water: 0,
    oxygen: -5,
    food: 0,
    size: { width: 5, height: 6 },

    isEditable: false,
    icon: '🗑️'
  },
  {
    id: 'storage',
    name: 'Almacén',
    subtitle: 'Suministros, equipos y materiales',
    description:
      'Espacio modular de 150 m² diseñado para guardar herramientas, trajes presurizados, repuestos y reservas críticas de alimento y oxígeno.',
    color: 'border border-amber-600',
    energy: -10,
    capacity: 0,
    water: 0,
    oxygen: -5,
    food: 0,
    size: { width: 10, height: 15 },

    isEditable: true,
    icon: '📦'
  },
  {
    id: 'rover',
    name: 'Vehículo Rover',
    subtitle: 'Exploración terrestre y transporte local',
    description:
      'Vehículo presurizado de 3x5 m para dos tripulantes. Autonomía de 50 km con baterías solares y soporte vital de 24 horas.',
    color: 'border border-red-600',
    energy: 0,
    capacity: 2,
    water: 0,
    oxygen: 0,
    food: 0,
    size: { width: 3, height: 5 },

    isEditable: false,
    icon: '🚗'
  },
  {
    id: 'spacecraft',
    name: 'Nave Espacial',
    subtitle: 'Transporte orbital y retorno a órbita baja marciana',
    description:
      'Vehículo de 600 m² con capacidad para 8 astronautas. Incluye cabina presurizada, propulsión química y sistemas de acoplamiento.',
    color: 'border border-slate-600',
    energy: -10,
    capacity: 8,
    water: 0,
    oxygen: -5,
    food: 0,
    size: { width: 20, height: 30 },

    isEditable: false,
    icon: '🚀'
  },
  {
    id: 'medical-center',
    name: 'Centro Médico',
    subtitle: 'Salud, emergencia y monitoreo vital',
    description:
      'Clínica presurizada de 80 m² con área de cirugía básica, monitoreo fisiológico y aislamiento de pacientes. Consumo medio de energía y oxígeno.',
    color: 'border border-pink-500',
    energy: -10,
    capacity: 0,
    water: 0,
    oxygen: -5,
    food: 0,
    size: { width: 8, height: 10 },

    isEditable: true,
    icon: '⚕️'
  },
  {
    id: 'recreation',
    name: 'Módulo de Recreación',
    subtitle: 'Ejercicio y bienestar psicológico',
    description:
      'Instalación de 216 m² con equipos de ejercicio, proyección de entornos virtuales y área de descanso para reducir el estrés de la misión.',
    color: 'border border-cyan-500',
    energy: -10,
    capacity: 0,
    water: 0,
    oxygen: -5,
    food: 0,
    size: { width: 12, height: 18 },

    isEditable: true,
    icon: '🎯'
  }
];


export function PhysicalLayout({
  modules,
  onUpdateModule,
  onRemoveModule,
  selectedPlanet
}: PhysicalLayoutProps) {
  const [draggedModule, setDraggedModule] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDraggingFromPanel, setIsDraggingFromPanel] = useState(false);
  const [newModuleType, setNewModuleType] = useState<any>(null);

  // Stats calculados
  const totalO2 = modules.reduce((acc, m) => {

    return acc + m.type.oxygen;
  }, 0);

  const totalWater = modules.reduce((acc, m) => {

    return acc + m.type.water;
  }, 0);

  const totalFood = modules.reduce((acc, m) => {
    return acc + m.type.food;
  }, 0);

  const totalEnergy = modules.reduce((acc, m) => {

    return acc + m.type.energy;
  }, 0);

  const totalCapacity = modules.reduce((acc, m) => {
    return acc + m.type.capacity;
  }, 0);

  const handleMouseDown = (e: React.MouseEvent, moduleId: string) => {
    e.preventDefault();
    const module = modules.find(m => m.id === moduleId);
    if (!module) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    setDraggedModule(moduleId);
    setDragOffset({ x: offsetX, y: offsetY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!draggedModule || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const newX = e.clientX - containerRect.left - dragOffset.x;
    const newY = e.clientY - containerRect.top - dragOffset.y;

    onUpdateModule(draggedModule, { x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setDraggedModule(null);
    setDragOffset({ x: 0, y: 0 });
  };

  const handleDragStart = (moduleType: any) => {
    setIsDraggingFromPanel(true);
    setNewModuleType(moduleType);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (!newModuleType || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - containerRect.left - 40;
    const y = e.clientY - containerRect.top - 40;

    // Crear nuevo módulo
    const getModuleCapacity = (id: string) => {
      if (id === 'dormitory') return 3;
      return 0;
    };

    const newModule = {
      id: `${newModuleType.id}-${Date.now()}`,
      type: {
        ...newModuleType,
        resources: {
          o2: newModuleType.id === 'greenhouse' ? -20 :
            newModuleType.id === 'laboratory' ? -10 :
              newModuleType.id === 'recycling-plant' ? -5 : 0,
          h2o: newModuleType.id === 'water-extractor' ? -100 :
            newModuleType.id === 'greenhouse' ? -20 :
              newModuleType.id === 'recycling-plant' ? -15 : 0,
          food: newModuleType.id === 'greenhouse' ? -30 : 0,
          energy: newModuleType.id === 'solar-plant' ? -95 :
            newModuleType.id === 'water-extractor' ? -20 :
              newModuleType.id === 'greenhouse' ? -15 :
                newModuleType.id === 'laboratory' ? -10 :
                  newModuleType.id === 'dormitory' ? 5 :
                    newModuleType.id === 'kitchen' ? 8 :
                      newModuleType.id === 'rover' ? 15 :
                        newModuleType.id === 'medical-center' ? 3 :
                          newModuleType.id === 'recreation' ? 6 : 0
        },
        capacity: getModuleCapacity(newModuleType.id),
        size: newModuleType.size ?? { width: 80, height: 80 },
        icon: newModuleType.icon
      },
      position: { x, y }
    };

    // Simular agregar módulo (esto debería ser manejado por la app principal)
    modules.push(newModule);
    onUpdateModule(newModule.id, newModule.position);

    setIsDraggingFromPanel(false);
    setNewModuleType(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (draggedModule) {
      document.addEventListener('mouseup', handleMouseUp);
      return () => document.removeEventListener('mouseup', handleMouseUp);
    }
  }, [draggedModule]);

  return (
    <div className="grid grid-cols-12 gap-6 h-full">
      {/* Sidebar con módulos disponibles */}
      <div
        className="col-span-3 space-y-4"
        style={{
          overflowY: "auto",
          maxHeight: "calc(100vh - 2rem)",
          paddingRight: "8px", // margen derecho para que no tape el scrollbar
        }}
      >
        {availableModules.map((moduleType) => (
          <Card
            key={moduleType.id}
            className={`p-4 cursor-grab active:cursor-grabbing ${moduleType.color} text-black hover:opacity-90 transition-opacity`}
            draggable
            onDragStart={() => handleDragStart(moduleType)}
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{moduleType.icon}</span>
                <div>
                  <h4 className="text-black">{moduleType.name}</h4>
                  <p className="text-xs text-black/80">{moduleType.subtitle}</p>
                </div>
              </div>
              <p className="text-sm text-black/90">{moduleType.description}</p>
            </div>
          </Card>
        ))}
      </div>


      {/* Área principal */}
      <div className="col-span-9 space-y-4 h-full flex flex-col">
        {/* Header con stats */}
        <div className="text-black p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-4">

            <h3 className="text-black">Resumen del Hábitat Marciano</h3>
          </div>

          <div className="grid grid-cols-5 gap-4">
            <Card className={`p-3 ${totalO2 < 0 ? 'bg-red-500': 'bg-white'} text-black`}>
              <div className="flex items-center gap-2">
                <Wind className="w-4 h-4 text-blue-500" />
                <div>
                  <p className="text-xs text-muted-foreground">Oxígeno</p>
                  <p className="font-medium">{totalO2} L/h</p>
                </div>
              </div>
            </Card>

            <Card className={`p-3 ${totalWater < 0 ? 'bg-red-500': 'bg-white'} text-black`}>
              <div className="flex items-center gap-2">
                <Droplets className="w-4 h-4 text-blue-500" />
                <div>
                  <p className="text-xs text-muted-foreground">Agua</p>
                  <p className="font-medium">{totalWater} L/día</p>
                </div>
              </div>
            </Card>

            <Card className={`p-3 ${totalFood < 0 ? 'bg-red-500': 'bg-white'} text-black`}>
              <div className="flex items-center gap-2">
                <Utensils className="w-4 h-4 text-green-500" />
                <div>
                  <p className="text-xs text-muted-foreground">Comida</p>
                  <p className="font-medium">{totalFood} kg/día</p>
                </div>
              </div>
            </Card>

            <Card className={`p-3 ${totalEnergy < 0 ? 'bg-red-500': 'bg-white'} text-black`}>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-500" />
                <div>
                  <p className="text-xs text-muted-foreground">Energía</p>
                  <p className="font-medium">{totalEnergy} kW</p>
                </div>
              </div>
            </Card>

            <Card className="p-3 bg-white text-black">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-purple-500" />
                <div>
                  <p className="text-xs text-muted-foreground">Capacidad</p>
                  <p className="font-medium">{totalCapacity} personas</p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Mapa de Marte */}
        <Card className="flex-1 overflow-hidden">
          <div
            ref={containerRef}
            className="relative w-full h-full bg-cover bg-center min-h-[500px]"
            style={{
              backgroundImage: `url(${marsBg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              position: "relative",
              border: "1px solid rgba(255,255,255,0.2)"
            }}
            onMouseMove={handleMouseMove}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            {/* === Coordenadas horizontales (arriba y abajo) === */}
            <div
              style={{
                position: "absolute",
                top: "0",
                left: "0",
                right: "0",
                height: "20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                color: "white",
                fontSize: "10px",
                padding: "0 10px",
                background: "rgba(0,0,0,0.3)",
                zIndex: 5,
              }}
            >
              {Array.from({ length: 8 }).map((_, i) => (
                <span key={i}>{i * 100}m</span>
              ))}
            </div>

            <div
              style={{
                position: "absolute",
                bottom: "0",
                left: "0",
                right: "0",
                height: "20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                color: "white",
                fontSize: "10px",
                padding: "0 10px",
                background: "rgba(0,0,0,0.3)",
                zIndex: 5,
              }}
            >
              {Array.from({ length: 8 }).map((_, i) => (
                <span key={i}>{i * 100}m</span>
              ))}
            </div>

            <div
              style={{
                position: "absolute",
                top: "20px",
                bottom: "20px",
                left: "0",
                width: "30px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                color: "white",
                fontSize: "10px",
                background: "rgba(0,0,0,0.3)",
                zIndex: 5,
              }}
            >
              {Array.from({ length: 10 }).map((_, i) => (
                <span key={i}>{i * 50}</span>
              ))}
            </div>
            <div
              style={{
                position: "absolute",
                top: "20px",
                bottom: "20px",
                right: "0",
                width: "30px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                color: "white",
                fontSize: "10px",
                background: "rgba(0,0,0,0.3)",
                zIndex: 5,
              }}
            >
              {Array.from({ length: 10 }).map((_, i) => (
                <span key={i}>{i * 50}</span>
              ))}
            </div>
            {modules.map((module) => (
              <div
                key={module.id}
                className={`absolute rounded-lg shadow-lg cursor-grab active:cursor-grabbing bg-none`}
                style={{
                  left: module.position.x,
                  top: module.position.y,
                  width: `${module.type.size.width}px`,
                  height: `${module.type.size.height}px`
                }}
                onMouseDown={(e) => handleMouseDown(e, module.id)}
              >
                <div className="w-full h-full flex flex-col items-center justify-center p-2 relative text-white">


                  <div className="text-2xl">
                    <button
                      onClick={() => onRemoveModule(module.id)}
                      className="absolute top-0 right-0 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 z-10"
                    >
                      <X className="w-3 h-3" />
                    </button>
                    {/* <SpriteIcon id={module.type.id} size={130} /> */}
                    <SpriteIcon
                      id={module.type.id}
                      size={7 * SPRITE_SCALE}
                    />
                  </div>
                  <div className="text-xs text-center font-medium mt-1 text-white">
                    {availableModules.find(m => m.id === module.type.id)?.name || module.type.name}
                  </div>
                </div>
              </div>
            ))}

            {/* Instrucciones overlay */}
            {modules.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <div className="text-center text-white p-6 rounded-lg bg-black/70">
                  <h4 className="text-white mb-2">Arrastra módulos desde el panel izquierdo</h4>
                  <p className="text-sm text-white/80">Posiciona los módulos en el terreno marciano</p>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}