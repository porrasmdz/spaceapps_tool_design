import sprites from "../assets/struc_sprites.png";

export const spriteMap: Record<string, { x: number; y: number; w?: number; h?: number }> = {
  "greenhouse": { x: 0, y: 0 },
  "water-extractor": { x: 130, y: 0 },
  "solar-plant": { x: 256, y: 0 },
  "laboratory": { x: 384, y: 0 },
  "dormitory": { x: 0, y: 136 },
  "kitchen": { x: 130, y: 130 },
  "recycling-plant": { x: 256, y: 130 },
  "waste-storage": { x: 384, y: 130 },
  "storage": { x: 0, y: 256 },
  "rover": { x: 130, y: 256 },
  "spacecraft": { x: 256, y: 256 },
  "medical-center": { x: 384, y: 256 },
  "recreation": { x: 0, y: 384 }
};

interface SpriteIconProps {
  id: string;
  size?: number;
}

export function SpriteIcon({ id, size = 80 }: SpriteIconProps) {
  const sprite = spriteMap[id] || { x: 0, y: 0 };

  // Escala del sprite: ajusta el zoom del fondo
  const scale = (size / 128); // asumiendo que cada sprite base mide 128x128 en el sheet

  return (
    <div
      className="sprite-icon"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundImage: `url(${sprites})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: `${512 * scale}px ${512 * scale}px`, // escala total del spritesheet
        backgroundPosition: `-${sprite.x * scale}px -${sprite.y * scale}px`,
        imageRendering: "auto", // mantiene la nitidez al escalar
      }}
    />
  );
}
