import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { CLASSES } from "@/lib/data";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function findClassById(id: string) {
  return CLASSES.find(c => c.id === id);
}
