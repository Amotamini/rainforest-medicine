import Image from "next/image";
import { img } from "@/lib/images";

type PhotoProps = {
  /** key into the processed-image manifest */
  name: string;
  className?: string;
  /** override the recorded alt text where the framing changes its meaning */
  alt?: string;
  /** render as a fill layer (parent must be positioned) */
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
  /** object-position for fill images */
  position?: string;
};

/**
 * A processed photograph, drawn from the grade manifest so every image
 * carries its true dimensions, recorded alt text, and a matching blur-up
 * placeholder graded to the same nocturnal look.
 */
export default function Photo({
  name,
  className,
  alt,
  fill,
  sizes,
  priority,
  position,
}: PhotoProps) {
  const meta = img(name);

  if (fill) {
    return (
      <Image
        src={meta.src}
        alt={alt ?? meta.alt}
        fill
        sizes={sizes ?? "100vw"}
        priority={priority}
        placeholder="blur"
        blurDataURL={meta.blurDataURL}
        className={className}
        style={position ? { objectPosition: position } : undefined}
      />
    );
  }

  return (
    <Image
      src={meta.src}
      alt={alt ?? meta.alt}
      width={meta.width}
      height={meta.height}
      sizes={sizes}
      priority={priority}
      placeholder="blur"
      blurDataURL={meta.blurDataURL}
      className={className}
    />
  );
}
