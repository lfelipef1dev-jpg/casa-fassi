import {
  Sprout,
  BookOpen,
  Sparkles,
  Target,
  Crown,
  Landmark,
  BedDouble,
  ShowerHead,
  Factory,
  Ticket,
  Users,
  Award,
  Gift,
  Plane,
  Package,
  Store,
  Handshake,
  HeartHandshake,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Sprout,
  BookOpen,
  Sparkles,
  Target,
  Crown,
  Landmark,
  BedDouble,
  ShowerHead,
  Factory,
  Ticket,
  Users,
  Award,
  Gift,
  Plane,
  Package,
  Store,
  Handshake,
  HeartHandshake,
};

export function getIcon(name: string): LucideIcon {
  return iconMap[name] || Award;
}
