import Image from "next/image";
import { brand } from "@/content/site";
import { cn } from "@/lib/cn";

const variants = {
  /** Header: ~36px de altura no mobile, 40px no tablet e 48px no desktop. */
  header: { height: "h-9 sm:h-10 lg:h-12", sizes: "(min-width: 1024px) 200px, 160px", eager: true },
  footer: { height: "h-14 sm:h-16", sizes: "260px", eager: false },
} as const;

/**
 * Logo oficial (definida em `brand.logo`, no site.ts).
 *
 * O arquivo tem margens transparentes; a caixa mostra só a área útil (`crop`) e a imagem
 * é posicionada dentro dela por porcentagem, mantendo a proporção sem editar o arquivo.
 */
export function Logo({ variant = "header", className }: { variant?: keyof typeof variants; className?: string }) {
  const { src, width, height, crop } = brand.logo;
  const config = variants[variant];

  return (
    <span
      className={cn("relative block shrink-0 overflow-hidden", config.height, className)}
      style={{ aspectRatio: `${crop.width} / ${crop.height}` }}
    >
      <Image
        src={src}
        alt={brand.name}
        width={width}
        height={height}
        sizes={config.sizes}
        loading={config.eager ? "eager" : "lazy"}
        className="absolute h-auto"
        style={{
          maxWidth: "none",
          width: `${(width / crop.width) * 100}%`,
          left: `${(-crop.x / crop.width) * 100}%`,
          top: `${(-crop.y / crop.height) * 100}%`,
        }}
      />
    </span>
  );
}
