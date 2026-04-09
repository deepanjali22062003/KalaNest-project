import { useState } from "react";

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
  category?: string;
}

const categoryColors: Record<string, { bg: string; text: string; icon: string }> = {
  "Ceramic Mugs":    { bg: "#fde8c8", text: "#b45f06", icon: "☕" },
  "Home Decor":      { bg: "#f9dfc0", text: "#7c3d12", icon: "🏺" },
  "Kitchen Items":   { bg: "#d1fae5", text: "#166534", icon: "🍽" },
  "Gifting Items":   { bg: "#fbcfe8", text: "#9d174d", icon: "🎁" },
  "Customized Items":{ bg: "#ddd6fe", text: "#5b21b6", icon: "✏" },
  "Wall Art":        { bg: "#fef3c7", text: "#92400e", icon: "🖼" },
  "Planters & Pots": { bg: "#bbf7d0", text: "#166534", icon: "🌿" },
};

export function ProductImage({ src, alt, className = "", category = "" }: ProductImageProps) {
  const [failed, setFailed] = useState(false);
  const style = categoryColors[category] ?? { bg: "#fde8c8", text: "#b45f06", icon: "✨" };

  if (failed) {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-2 w-full h-full ${className}`}
        style={{ background: style.bg }}
      >
        <span style={{ fontSize: "2.5rem" }}>{style.icon}</span>
        <span
          className="text-xs font-semibold text-center px-2 leading-tight"
          style={{ color: style.text }}
        >
          {alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}
