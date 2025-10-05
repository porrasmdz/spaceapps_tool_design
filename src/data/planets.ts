export interface Planet {
  id: string;
  name: string;
  temperature: string;
  pressure: string;
  radiation: string;
  gravity: string;
  description: string;
  color: string;
}

export const planets: Planet[] = [
  {
    id: "mars",
    name: "Marte",
    temperature: "-63°C (promedio)",
    pressure: "0.006 atm",
    radiation: "Alta (sin campo magnético)",
    gravity: "3.71 m/s² (38% de la Tierra)",
    description: "Planeta rocoso con atmósfera delgada de CO2",
    color: "#CD5C5C"
  },
  {
    id: "moon",
    name: "Luna",
    temperature: "-23°C a 127°C",
    pressure: "10⁻¹⁵ atm (casi vacío)",
    radiation: "Muy alta (sin atmósfera)",
    gravity: "1.62 m/s² (16% de la Tierra)",
    description: "Satélite natural de la Tierra sin atmósfera",
    color: "#C0C0C0"
  },
  {
    id: "europa",
    name: "Europa (Luna de Júpiter)",
    temperature: "-160°C",
    pressure: "10⁻¹² atm",
    radiation: "Extrema (campo magnético de Júpiter)",
    gravity: "1.31 m/s² (13% de la Tierra)",
    description: "Luna helada con océano subsuperficial",
    color: "#E8DCC8"
  },
  {
    id: "titan",
    name: "Titán (Luna de Saturno)",
    temperature: "-179°C",
    pressure: "1.45 atm",
    radiation: "Baja (atmósfera protectora)",
    gravity: "1.35 m/s² (14% de la Tierra)",
    description: "Luna con atmósfera densa de nitrógeno",
    color: "#FFA500"
  }
];

export interface ModuleType {
  id: string;
  name: string;
  icon: string;
  description: string;
  size: { width: number; height: number };
  capacity: number;
  resources: {
    o2: number;
    h2o: number;
    food: number;
    energy: number;
  };
}

export const moduleTypes: ModuleType[] = [
  {
    id: "work",
    name: "Módulo de Trabajo",
    icon: "briefcase",
    description: "Área de trabajo y laboratorio",
    size: { width: 200, height: 150 },
    capacity: 4,
    resources: { o2: 20, h2o: 10, food: 5, energy: 50 }
  },
  {
    id: "bedroom",
    name: "Dormitorios",
    icon: "bed",
    description: "Área de descanso para la tripulación",
    size: { width: 180, height: 120 },
    capacity: 6,
    resources: { o2: 30, h2o: 15, food: 0, energy: 20 }
  },
  {
    id: "kitchen",
    name: "Cocina",
    icon: "utensils",
    description: "Preparación de alimentos",
    size: { width: 150, height: 100 },
    capacity: 2,
    resources: { o2: 10, h2o: 40, food: 100, energy: 60 }
  },
  {
    id: "greenhouse",
    name: "Incubadora de Plantas",
    icon: "sprout",
    description: "Cultivo de alimentos y producción de O2",
    size: { width: 220, height: 160 },
    capacity: 2,
    resources: { o2: -50, h2o: 80, food: -80, energy: 70 }
  },
  {
    id: "health",
    name: "Área de Salud",
    icon: "heart-pulse",
    description: "Centro médico y monitoreo de salud",
    size: { width: 160, height: 130 },
    capacity: 3,
    resources: { o2: 15, h2o: 20, food: 0, energy: 40 }
  }
];

export interface PlantType {
  name: string;
  growthTime: string;
  nutrition: string;
  o2Production: string;
  waterNeeds: string;
  spaceRequired: string;
  suitableFor: string[];
}

export const plantDatabase: PlantType[] = [
  {
    name: "Lechuga",
    growthTime: "28-30 días",
    nutrition: "Vitaminas A, K, folato",
    o2Production: "Alta",
    waterNeeds: "Media",
    spaceRequired: "0.5 m² por planta",
    suitableFor: ["mars", "moon", "europa", "titan"]
  },
  {
    name: "Tomates Cherry",
    growthTime: "60-80 días",
    nutrition: "Vitaminas C, K, potasio",
    o2Production: "Muy alta",
    waterNeeds: "Alta",
    spaceRequired: "1.5 m² por planta",
    suitableFor: ["mars", "titan"]
  },
  {
    name: "Espinacas",
    growthTime: "37-45 días",
    nutrition: "Hierro, calcio, vitaminas",
    o2Production: "Alta",
    waterNeeds: "Media",
    spaceRequired: "0.3 m² por planta",
    suitableFor: ["mars", "moon", "europa", "titan"]
  },
  {
    name: "Fresas",
    growthTime: "60-90 días",
    nutrition: "Vitamina C, antioxidantes",
    o2Production: "Media",
    waterNeeds: "Alta",
    spaceRequired: "1 m² por planta",
    suitableFor: ["mars", "titan"]
  },
  {
    name: "Patatas",
    growthTime: "70-120 días",
    nutrition: "Carbohidratos, potasio, vitamina C",
    o2Production: "Media",
    waterNeeds: "Media-alta",
    spaceRequired: "2 m² por planta",
    suitableFor: ["mars", "moon", "europa", "titan"]
  }
];
