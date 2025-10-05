import { Planet } from "../data/planets";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Rocket,
  Target,
  Users,
  MapPin,
  Play,
  ArrowRight,
  Gauge,
  Building,
  Search
} from "lucide-react";
import astronautImage from '../assets/32967b251cd4f4bc17632db9f35e43df6e374f14.png';

interface HomeViewProps {
  selectedPlanet: Planet;
  placedModules: any[];
  totalCapacity: number;
  onTabChange: (tab: string) => void;
}

export function HomeView({
  selectedPlanet,
  placedModules,
  totalCapacity,
  onTabChange
}: HomeViewProps) {
  const quickStats = [
    {
      label: "Planeta Seleccionado",
      value: selectedPlanet.name,
      icon: MapPin,
      color: "text-blue-500"
    },
    {
      label: "Módulos Diseñados",
      value: placedModules.length,
      icon: Building,
      color: "text-green-500"
    },
    {
      label: "Capacidad Total",
      value: `${totalCapacity} personas`,
      icon: Users,
      color: "text-purple-500"
    },
    {
      label: "Estado del Proyecto",
      value: placedModules.length > 0 ? "En Progreso" : "Iniciando",
      icon: Gauge,
      color: "text-orange-500"
    }
  ];

  const features = [
    {
      title: "Diseño Exterior",
      description: "Posiciona módulos en el terreno marciano con vista aérea interactiva",
      icon: MapPin,
      tab: "layout",
      color: "bg-blue-50 border-blue-200 hover:bg-blue-100"
    },
    {
      title: "Diseño Interior",
      description: "Configura el espacio interno de cada módulo y gestiona recursos",
      icon: Building,
      tab: "design",
      color: "bg-green-50 border-green-200 hover:bg-green-100"
    },
    {
      title: "Exploración Virtual",
      description: "Recorre el interior del hábitat en vista de primera persona",
      icon: Search,
      tab: "explore",
      color: "bg-purple-50 border-purple-200 hover:bg-purple-100"
    }
  ];

  const getProgressStatus = () => {
    if (placedModules.length === 0) return "Comenzar Diseño";
    if (placedModules.length < 3) return "Diseño Básico";
    if (placedModules.length < 5) return "Diseño Avanzado";
    return "Diseño Completo";
  };

  return (
    <div className="space-y-8 mx-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden py-8 rounded-2xl bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
        <div className="absolute inset-0">
          <div
            className="absolute  inset-0 bg-[url('https://images.unsplash.com/photo-1614677306683-7a6034caacef?w=400')] bg-center"
            style={{
              backgroundImage: `url(${astronautImage})`,
              // backgroundRepeat: 'repeat-x', // se repite horizontalmente
              // backgroundPosition: '80% center', // la alinea más hacia la derecha
              // backgroundSize: 'auto 100%', // mantiene proporción vertical
              position: 'absolute',
              top: 0,
              left: 0,
              height: '450%',
              objectFit: 'contain',
              borderRadius: '0.5rem',
              // boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              zIndex: 0,
              transition: 'all 0.3s ease'
            }} />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
        </div>
        {/* <img 
                src={astronautImage} 
                width={980}
                alt="Astronauta trabajando en el hábitat espacial" 
                className="w-full h-full rounded-lg shadow-2xl z-0 absolute object-cover top-0 left-0"
              />
               */}
        {/* <img
          src={astronautImage}
          alt="Astronauta trabajando en el hábitat espacial"
          className="h-full rounded-lg shadow-2xl z-0 absolute object-cover top-0"
          style={{
            right: '150px',         // mueve la imagen 120px hacia la derecha
            objectPosition: '80% center', // muestra más el lado derecho de la imagen
            backgroundRepeat: 'repeat',   // por si usas repetición en backgrounds
            transition: 'all 0.3s ease'   // suave si luego quieres animar
          }}
        /> */}


        <div className="relative p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left side - Text content */}
            <div className="z-10   mb-4 py-8">
              <div className="flex items-center gap-3 ">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                  <Rocket className="w-6 h-6 text-white" />
                </div>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  Misión Activa
                </Badge>
              </div>

              <h1 className="text-4xl md:text-5xl text-white mb-4">
                Diseñador de Hábitats Espaciales
              </h1>
              <p className="text-xl text-white/80 mb-8">
                Crea y explora hábitats sostenibles para la colonización de {selectedPlanet.name}.
                Diseña desde el exterior hasta el interior con tecnología avanzada.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="gap-2 bg-white text-black hover:bg-white/90"
                  onClick={() => onTabChange("layout")}
                >
                  <Play className="w-5 h-5" />
                  Comenzar Diseño
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 border-white/30 hover:bg-white/10"
                  onClick={() => onTabChange("explore")}
                >
                  <Search className="w-5 h-5" />
                  Explorar Interior
                </Button>
              </div>
            </div>

            {/* <div className="w-full border lg:block  overflow-hidden">
              <img 
                src={astronautImage} 
                alt="Astronauta trabajando en el hábitat espacial" 
                width={450}
                height={300} 
                className="object-cover ml-8 pl-8 rounded-lg shadow-2xl"
              />
            </div> */}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="p-6">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg bg-muted flex items-center justify-center ${stat.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="font-medium truncate">{stat.value}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Project Progress */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3>Progreso del Proyecto</h3>
            <p className="text-sm text-muted-foreground">Estado actual: {getProgressStatus()}</p>
          </div>
          <Badge variant={placedModules.length > 0 ? "default" : "secondary"}>
            {Math.min(100, (placedModules.length / 5) * 100).toFixed(0)}% Completado
          </Badge>
        </div>

        <div className="w-full bg-muted rounded-full h-3 mb-4">
          <div
            className="bg-primary h-3 rounded-full transition-all duration-300"
            style={{ width: `${Math.min(100, (placedModules.length / 5) * 100)}%` }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${placedModules.length > 0 ? 'bg-green-500' : 'bg-muted'}`} />
            <span>Módulos Básicos</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${placedModules.length >= 3 ? 'bg-green-500' : 'bg-muted'}`} />
            <span>Layout Exterior</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${placedModules.length >= 5 ? 'bg-green-500' : 'bg-muted'}`} />
            <span>Diseño Completo</span>
          </div>
        </div>
      </Card>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Card
              key={index}
              className={`p-6 cursor-pointer transition-all hover:shadow-lg ${feature.color}`}
              onClick={() => onTabChange(feature.tab)}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-white/80 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="mb-2">{feature.title}</h4>
                  <p className="text-sm text-muted-foreground mb-4">{feature.description}</p>
                  <div className="flex items-center gap-2 text-sm font-medium text-primary">
                    <span>Abrir</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <Card className="p-6">
        <h3 className="mb-4">Actividad Reciente</h3>
        <div className="space-y-3">
          {placedModules.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Target className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No hay actividad reciente</p>
              <p className="text-sm">Comienza diseñando tu primer módulo</p>
            </div>
          ) : (
            placedModules.slice(-3).map((module, index) => (
              <div key={module.id} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Building className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm">Módulo {module.type.name} agregado</p>
                  <p className="text-xs text-muted-foreground">Hace unos momentos</p>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
}