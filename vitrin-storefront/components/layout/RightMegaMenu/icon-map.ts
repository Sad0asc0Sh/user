import {
  Smartphone,
  Laptop,
  Watch,
  Headphones,
  Camera,
  Gamepad2,
  HelpCircle, // Default icon
  type LucideIcon,
} from 'lucide-react';

const iconMap: { [key: string]: LucideIcon } = {
  Smartphone,
  Laptop,
  Watch,
  Headphones,
  Camera,
  Gamepad2,
};

export const getIcon = (iconName?: string): LucideIcon => {
  if (iconName && iconMap[iconName]) {
    return iconMap[iconName];
  }
  return HelpCircle;
};
