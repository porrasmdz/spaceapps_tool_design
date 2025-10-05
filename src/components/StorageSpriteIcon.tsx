import storageSprites from "../assets/storage_sprites.png";

export const storageSpriteMap: Record<
  string,
  { x: number; y: number; w?: number; h?: number }
> = {
  "treadmill": { x: 50, y: 10 },           // caminadora con arnés
  "vr-station": { x: 260, y: 25 },         // estación de realidad virtual
  "storage-rack": { x: 40, y: 190 },       // rack de almacenamiento
  "battery-pack": { x: 200, y: 180 },       // módulo de energía
  "galley-unit": { x: 120, y: 320 },       // unidad de cocina compacta
  "folding-table": { x: 330, y: 180 },     // mesa plegable multifuncional
  "food-storage": { x: 360, y: 340 },      // almacenamiento de alimentos
};

interface StorageSpriteIconProps {
  id: string;
  size?: number;
}

export function StorageSpriteIcon({ id, size = 80 }: StorageSpriteIconProps) {
  const sprite = storageSpriteMap[id] || { x: 0, y: 0 };

  // cada sprite ocupa aprox 100–120px dentro del sheet 500×500
  const baseSize = 140;
  const scale = size / baseSize;

  return (
    <div
      className="sprite-icon"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundImage: `url(${storageSprites})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: `${500 * scale}px ${500 * scale}px`, // escala total del spritesheet
        backgroundPosition: `-${sprite.x * scale}px -${sprite.y * scale}px`,
        imageRendering: "auto", // suave, sin pixelado
        borderRadius: "8px",
      }}
    />
  );
}
