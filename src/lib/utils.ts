import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateDate(){
  const date = new Date();
  let dateString = date.toLocaleString('es-ES', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'});
  dateString = dateString.charAt(0).toUpperCase() + dateString.slice(1);
  return dateString;
}
