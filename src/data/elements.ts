export type ElementId = "metal" | "water" | "wood" | "fire" | "earth";

export interface FiveElement {
  id: ElementId;
  label: string;
}

export const FIVE_ELEMENTS: FiveElement[] = [
  { id: "metal", label: "Metal" },
  { id: "water", label: "Water" },
  { id: "wood", label: "Wood" },
  { id: "fire", label: "Fire" },
  { id: "earth", label: "Earth" },
];
