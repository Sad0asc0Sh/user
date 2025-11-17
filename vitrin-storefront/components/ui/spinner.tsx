
import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";

const Spinner = () => {
  return (
    <Loader className="h-6 w-6 animate-spin text-primary" />
  );
};

export { Spinner };
