import Image from "next/image";
import { Camera } from "lucide-react";
import type { SiteImage } from "@/content/types";
import { cn } from "@/lib/cn";
import { Icon } from "./Icon";
import { toneClasses } from "./tones";

/**
 * Foto do site.
 *
 * FOTOS REAIS: coloque o arquivo no caminho indicado em `image.src` (em /public/images)
 * e marque `ready: true` no `site.ts`. Até lá, exibimos um placeholder elegante,
 * com a mesma proporção e o mesmo texto alternativo, sem causar mudança de layout.
 *
 * O componente ocupa 100% do elemento pai: defina proporção ou altura via `className`.
 */
export function Photo({
  image,
  className,
  sizes = "100vw",
  preload = false,
  compactLabel = false,
}: {
  image: SiteImage;
  className?: string;
  sizes?: string;
  /** Pré-carrega a imagem (use só na foto do hero). Substitui o antigo `priority` no Next 16. */
  preload?: boolean;
  /** Mostra só "Foto" no selo do placeholder (útil quando há legenda por cima). */
  compactLabel?: boolean;
}) {
  if (image.ready) {
    return (
      // Fundo no tom da foto enquanto ela carrega (em vez de um espaço em branco).
      <div className={cn("relative overflow-hidden", toneClasses[image.tone].soft, className)}>
        <Image src={image.src} alt={image.alt} fill sizes={sizes} preload={preload} className="object-cover" />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={image.alt}
      data-photo-placeholder={image.src}
      className={cn("photo-placeholder relative overflow-hidden", toneClasses[image.tone].placeholder, className)}
    >
      {image.icon && (
        <Icon
          name={image.icon}
          strokeWidth={0.75}
          className="absolute top-1/2 left-1/2 size-[28%] max-h-36 max-w-36 -translate-x-1/2 -translate-y-1/2 text-deep-blue/30"
        />
      )}
      <span className="absolute top-3 left-3 inline-flex max-w-[calc(100%-1.5rem)] items-center gap-1.5 rounded-full bg-warm-white/90 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-graphite uppercase">
        <Camera aria-hidden="true" className="size-3.5 shrink-0" strokeWidth={2} />
        <span className="truncate">{compactLabel ? "Foto" : `Foto: ${image.label}`}</span>
      </span>
    </div>
  );
}
