import dormSprites from "../assets/design_sprites.png";

export const dormSpriteMap: Record<
  string,
  { x: number; y: number; w?: number; h?: number }
> = {
  "sleep-pod": { x: 30, y: 30 },
  "personal-stowage": { x: 200, y: 20 },
  "privacy-curtain": { x: 320, y: 20 },
  "hygiene-module": { x: 50, y: 315 },
  "uwms": { x: 180, y: 310 },
  "science-bench": { x: 30, y: 180 },
  "analysis-station": { x: 200, y: 160 },
  "sample-storage": { x: 350, y: 160 },
};

interface DormSpriteIconProps {
  id: string;
  size?: number;
}

export function DormSpriteIcon({ id, size = 80 }: DormSpriteIconProps) {
  const sprite = dormSpriteMap[id] || { x: 0, y: 0 };

  // Cada sprite ocupa 100x100 dentro de una grilla 5x5 en un canvas 500x500
  const baseSize = 130;
  const scale = size / baseSize;

  return (
    <div
      className="sprite-icon"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundImage: `url(${dormSprites})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: `${500 * scale}px ${500 * scale}px`, // tamaño total del spritesheet escalado
        backgroundPosition: `-${sprite.x * scale}px -${sprite.y * scale}px`,
        imageRendering: "auto", // estilo suave (no pixelado)
        borderRadius: "8px",
      }}
    />
  );
}
