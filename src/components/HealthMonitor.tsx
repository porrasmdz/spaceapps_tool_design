import { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import {
  Heart,
  Thermometer,
  Activity,
  Wind,
  Moon,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

interface VitalSign {
  name: string;
  value: number;
  unit: string;
  icon: any;
  normal: { min: number; max: number };
  color: string;
}

interface Astronaut {
  id: string;
  name: string;
  role: string;
  vitals: {
    heartRate: number;
    temperature: number;
    bloodPressureSys: number;
    bloodPressureDia: number;
    o2Saturation: number;
    sleepHours: number;
  };
}

export function HealthMonitor() {
  const [astronauts, setAstronauts] = useState<Astronaut[]>([
    {
      id: "1",
      name: "Comandante Sarah Chen",
      role: "Comandante",
      vitals: {
        heartRate: 72,
        temperature: 36.6,
        bloodPressureSys: 120,
        bloodPressureDia: 80,
        o2Saturation: 98,
        sleepHours: 7.5,
      },
    },
    {
      id: "2",
      name: "Dr. James Morrison",
      role: "Médico",
      vitals: {
        heartRate: 68,
        temperature: 36.8,
        bloodPressureSys: 115,
        bloodPressureDia: 75,
        o2Saturation: 99,
        sleepHours: 6.2,
      },
    },
    {
      id: "3",
      name: "Ing. Maria Rodriguez",
      role: "Ingeniera",
      vitals: {
        heartRate: 85,
        temperature: 37.1,
        bloodPressureSys: 130,
        bloodPressureDia: 85,
        o2Saturation: 97,
        sleepHours: 5.8,
      },
    },
  ]);

  const [selectedAstronaut, setSelectedAstronaut] =
    useState<Astronaut>(astronauts[0]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setAstronauts((prev) =>
        prev.map((astronaut) => ({
          ...astronaut,
          vitals: {
            ...astronaut.vitals,
            heartRate:
              astronaut.vitals.heartRate +
              (Math.random() - 0.5) * 2,
            temperature:
              astronaut.vitals.temperature +
              (Math.random() - 0.5) * 0.1,
            o2Saturation: Math.min(
              100,
              Math.max(
                95,
                astronaut.vitals.o2Saturation +
                  (Math.random() - 0.5),
              ),
            ),
          },
        })),
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getVitalSigns = (astronaut: Astronaut): VitalSign[] => [
    {
      name: "Frecuencia Cardíaca",
      value: Math.round(astronaut.vitals.heartRate),
      unit: "bpm",
      icon: Heart,
      normal: { min: 60, max: 100 },
      color: "text-red-500",
    },
    {
      name: "Temperatura",
      value: parseFloat(
        astronaut.vitals.temperature.toFixed(1),
      ),
      unit: "°C",
      icon: Thermometer,
      normal: { min: 36.1, max: 37.2 },
      color: "text-orange-500",
    },
    {
      name: "Presión Arterial",
      value: Math.round(astronaut.vitals.bloodPressureSys),
      unit: `/${Math.round(astronaut.vitals.bloodPressureDia)} mmHg`,
      icon: Activity,
      normal: { min: 90, max: 140 },
      color: "text-blue-500",
    },
    {
      name: "Saturación O₂",
      value: Math.round(astronaut.vitals.o2Saturation),
      unit: "%",
      icon: Wind,
      normal: { min: 95, max: 100 },
      color: "text-cyan-500",
    },
    {
      name: "Horas de Sueño",
      value: parseFloat(astronaut.vitals.sleepHours.toFixed(1)),
      unit: "hrs",
      icon: Moon,
      normal: { min: 7, max: 9 },
      color: "text-purple-500",
    },
  ];

  const isAbnormal = (vital: VitalSign) => {
    return (
      vital.value < vital.normal.min ||
      vital.value > vital.normal.max
    );
  };

  const vitalSigns = getVitalSigns(selectedAstronaut);
  const hasAlerts = vitalSigns.some(isAbnormal);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2>Monitor de Salud</h2>
        <Badge
          variant={hasAlerts ? "destructive" : "secondary"}
        >
          {hasAlerts ? (
            <>
              <AlertTriangle className="w-3 h-3 mr-1" />
              Alerta
            </>
          ) : (
            <>
              <CheckCircle2 className="w-3 h-3 mr-1" />
              Normal
            </>
          )}
        </Badge>
      </div>

      {/* Astronaut Selector */}
      <div className="flex gap-2">
        {astronauts.map((astronaut) => (
          <button
            key={astronaut.id}
            onClick={() => setSelectedAstronaut(astronaut)}
            className={`flex-1 p-3 rounded-lg border-2 transition-all text-left ${
              selectedAstronaut.id === astronaut.id
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/50"
            }`}
          >
            <p className="text-sm">{astronaut.name}</p>
            <p className="text-xs text-muted-foreground">
              {astronaut.role}
            </p>
          </button>
        ))}
      </div>

      {/* Vital Signs Cards */}
      <div className="space-y-3">
        {vitalSigns.map((vital, index) => {
          const Icon = vital.icon;
          const abnormal = isAbnormal(vital);

          return (
            <Card
              key={index}
              className={`p-4 ${abnormal ? "border-destructive bg-destructive/5" : ""}`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Icon className={`w-5 h-5 ${vital.color}`} />
                  <div>
                    <p className="text-sm">{vital.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Normal: {vital.normal.min}-
                      {vital.normal.max} {vital.unit}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={
                      abnormal ? "text-destructive" : ""
                    }
                  >
                    {vital.value}
                    {vital.unit}
                  </p>
                  {abnormal && (
                    <Badge
                      variant="destructive"
                      className="text-xs mt-1"
                    >
                      Fuera de rango
                    </Badge>
                  )}
                </div>
              </div>

              <Progress
                value={Math.min(
                  100,
                  Math.max(
                    0,
                    ((vital.value - vital.normal.min) /
                      (vital.normal.max - vital.normal.min)) *
                      100,
                  ),
                )}
                className="h-2"
              />
            </Card>
          );
        })}
      </div>

      <Card className="p-4 bg-muted/50">
        <p className="text-sm">
          <strong>💡 Pulsera Inteligente:</strong> Los datos se
          actualizan cada 3 segundos desde las pulseras
          inteligentes de cada astronauta. Las alertas se envían
          automáticamente al área de salud.
        </p>
      </Card>
    </div>
  );
}