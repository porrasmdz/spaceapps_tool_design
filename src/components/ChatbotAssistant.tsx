import { useState, useRef, useEffect } from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Send, Bot, User, Minimize2, Maximize2 } from "lucide-react";
import { Planet, PlantType } from "../data/planets";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ChatbotAssistantProps {
  selectedPlanet: Planet | null;
  modules: any[];
  totalResources: any;
  totalCapacity: number;
  plantDatabase: PlantType[];
}

export function ChatbotAssistant({ 
  selectedPlanet, 
  modules, 
  totalResources, 
  totalCapacity,
  plantDatabase
}: ChatbotAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "¡Hola! Soy tu asistente virtual para el diseño de hábitats espaciales. Puedo ayudarte con:\n\n• Dimensiones y capacidad del hábitat\n• Gestión de recursos (O₂, H₂O, alimentos)\n• Recomendaciones de plantas para cultivo\n• Distribución óptima de espacios\n• Conexiones entre módulos\n\n¿En qué puedo ayudarte?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isMinimized, setIsMinimized] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const generateResponse = (userMessage: string): string => {
    const msg = userMessage.toLowerCase();

    // Preguntas sobre el planeta
    if (msg.includes("planeta") || msg.includes("condiciones")) {
      if (!selectedPlanet) {
        return "Aún no has seleccionado un planeta. Por favor, selecciona uno desde el panel de la izquierda para que pueda darte información específica.";
      }
      return `Has seleccionado ${selectedPlanet.name}. Condiciones:\n\n🌡️ Temperatura: ${selectedPlanet.temperature}\n💨 Presión: ${selectedPlanet.pressure}\n☢️ Radiación: ${selectedPlanet.radiation}\n🌍 Gravedad: ${selectedPlanet.gravity}\n\nEste ambiente requiere un hábitat bien sellado y sistemas de soporte vital robustos.`;
    }

    // Preguntas sobre recursos
    if (msg.includes("recurso") || msg.includes("o2") || msg.includes("oxígeno") || msg.includes("agua")) {
      const o2Status = totalResources.o2 < 0 ? "produciendo" : "consumiendo";
      const foodStatus = totalResources.food < 0 ? "produciendo" : "consumiendo";
      
      let response = `📊 **Estado actual de recursos:**\n\n`;
      response += `🫁 Oxígeno (O₂): ${o2Status} ${Math.abs(totalResources.o2)} unidades/día\n`;
      response += `💧 Agua (H₂O): Consumiendo ${totalResources.h2o} unidades/día\n`;
      response += `🍎 Alimentos: ${foodStatus} ${Math.abs(totalResources.food)} unidades/día\n`;
      response += `⚡ Energía: Consumiendo ${totalResources.energy} kW\n\n`;

      if (totalResources.o2 > 0) {
        response += "⚠️ **Advertencia:** Necesitas agregar más incubadoras de plantas para producir oxígeno suficiente.";
      } else {
        response += "✅ Tu hábitat está produciendo oxígeno. ¡Excelente!";
      }

      return response;
    }

    // Preguntas sobre plantas
    if (msg.includes("planta") || msg.includes("cultiv") || msg.includes("incubadora")) {
      if (!selectedPlanet) {
        return "Selecciona un planeta primero para recomendarte plantas adecuadas.";
      }

      const suitablePlants = plantDatabase.filter(plant => 
        plant.suitableFor.includes(selectedPlanet.id)
      );

      let response = `🌱 **Plantas recomendadas para ${selectedPlanet.name}:**\n\n`;
      suitablePlants.slice(0, 3).forEach(plant => {
        response += `**${plant.name}**\n`;
        response += `⏱️ Tiempo de crecimiento: ${plant.growthTime}\n`;
        response += `🥗 Nutrición: ${plant.nutrition}\n`;
        response += `📏 Espacio: ${plant.spaceRequired}\n\n`;
      });

      response += `Para un hábitat de ${totalCapacity} personas, se recomienda al menos 10-15 m² de área de cultivo.`;
      return response;
    }

    // Preguntas sobre capacidad
    if (msg.includes("capacidad") || msg.includes("cuántas personas") || msg.includes("tripulantes")) {
      const moduleCount = modules.length;
      return `🏠 **Capacidad del hábitat:**\n\nTu hábitat actual puede albergar hasta **${totalCapacity} personas** distribuidas en ${moduleCount} módulo(s).\n\nPara ${totalCapacity} personas se recomienda:\n• 1 módulo de trabajo cada 4 personas\n• 1 dormitorio cada 6 personas\n• 1 cocina cada 8 personas\n• 1 área de salud cada 10 personas\n• 1 incubadora de plantas cada 5 personas`;
    }

    // Preguntas sobre distribución
    if (msg.includes("distribu") || msg.includes("organiz") || msg.includes("diseño") || msg.includes("recomendación")) {
      let response = "💡 **Recomendaciones de distribución:**\n\n";
      
      const hasGreenhouse = modules.some(m => m.type.id === "greenhouse");
      const hasBedroom = modules.some(m => m.type.id === "bedroom");
      const hasHealth = modules.some(m => m.type.id === "health");
      
      if (!hasGreenhouse) {
        response += "🌱 Agrega una incubadora de plantas para producción de O₂ y alimentos\n";
      }
      if (!hasBedroom) {
        response += "🛏️ Necesitas dormitorios para el descanso de la tripulación\n";
      }
      if (!hasHealth) {
        response += "❤️ Un área de salud es esencial para monitoreo médico\n";
      }
      
      response += "\n**Disposición óptima:**\n";
      response += "1. Coloca dormitorios lejos de áreas ruidosas (cocina, trabajo)\n";
      response += "2. La incubadora debe estar cerca de la cocina para facilitar el transporte de alimentos\n";
      response += "3. El área de salud debe ser de fácil acceso desde todos los módulos\n";
      response += "4. Conecta todos los módulos con pasillos presurizados";
      
      return response;
    }

    // Preguntas sobre conexiones
    if (msg.includes("conex") || msg.includes("pasillo") || msg.includes("unir")) {
      return "🔗 **Conexiones entre módulos:**\n\nTodos los módulos deben estar conectados mediante pasillos presurizados para permitir el movimiento seguro de la tripulación.\n\n**Recomendaciones:**\n• Usa pasillos de 2-3 metros de diámetro\n• Instala esclusas de seguridad entre secciones\n• Asegura redundancia en las rutas de evacuación\n• Mantén distancias cortas entre módulos críticos (dormitorios-salud)\n• Los pasillos consumen energía para calefacción y presurización";
    }

    // Preguntas sobre salud
    if (msg.includes("salud") || msg.includes("médic") || msg.includes("monitor") || msg.includes("pulsera")) {
      return "❤️ **Sistema de monitoreo de salud:**\n\nCada astronauta debe usar una pulsera inteligente que monitoriza:\n\n• 🫀 Frecuencia cardíaca\n• 🌡️ Temperatura corporal\n• 💉 Presión arterial\n• 🫁 Saturación de O₂\n• 😴 Calidad del sueño\n\nLos datos se transmiten al área de salud en tiempo real. Se generan alertas automáticas si se detectan anomalías.";
    }

    // Respuesta por defecto
    return "Puedo ayudarte con información sobre:\n\n• Condiciones del planeta seleccionado\n• Estado y gestión de recursos\n• Plantas recomendadas para cultivo\n• Capacidad del hábitat\n• Distribución y organización de módulos\n• Conexiones entre estructuras\n• Sistema de monitoreo de salud\n\n¿Sobre qué tema necesitas ayuda?";
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate AI response delay
    setTimeout(() => {
      const response = generateResponse(input);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
    }, 500);

    setInput("");
  };

  return (
    <Card className={`flex flex-col transition-all ${isMinimized ? 'h-14' : 'h-full'}`}>
      <div className="p-4 border-b flex items-center justify-between bg-muted/50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <Bot className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h3>Asistente Virtual</h3>
            <p className="text-xs text-muted-foreground">Siempre disponible</p>
          </div>
        </div>
        <button
          onClick={() => setIsMinimized(!isMinimized)}
          className="p-2 hover:bg-muted rounded-lg transition-colors"
        >
          {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
        </button>
      </div>

      {!isMinimized && (
        <>
          <ScrollArea className="flex-1 p-4">
            <div ref={scrollRef} className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.role === "user" ? "justify-end" : ""}`}
                >
                  {message.role === "assistant" && (
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-primary-foreground" />
                    </div>
                  )}
                  
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{message.content}</p>
                  </div>

                  {message.role === "user" && (
                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder="Escribe tu pregunta..."
                className="flex-1"
              />
              <Button onClick={handleSend} size="icon">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </>
      )}
    </Card>
  );
}
