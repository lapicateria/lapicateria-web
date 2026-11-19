export type TemperatureEquipmentKind = "refrigerated" | "freezer";

export type TemperatureEquipment = {
  name: string;
  zone: "Barra" | "Cocina" | "Almacén";
  kind: TemperatureEquipmentKind;
  active: boolean;
  archived?: boolean;
  note?: string;
};

export type TemperatureEvaluation = {
  status: "correcto" | "revisar" | "incidencia";
  alertLevel?: "aviso" | "incidencia";
  message: string;
  acceptableRange: string;
};

function readTemperatureEquipment(): TemperatureEquipment[] {
  try {
    const equipment: unknown = JSON.parse(process.env.NEXT_PUBLIC_APPCC_TEMPERATURE_EQUIPMENT || "[]");
    if (!Array.isArray(equipment)) return [];
    return equipment.filter((item): item is TemperatureEquipment =>
      item && typeof item.name === "string" && item.name.trim().length > 0
      && ["Barra", "Cocina", "Almacén"].includes(item.zone)
      && ["refrigerated", "freezer"].includes(item.kind)
      && typeof item.active === "boolean");
  } catch {
    return [];
  }
}

export const temperatureEquipment = readTemperatureEquipment();

export const archivedTemperatureEquipment = temperatureEquipment
  .filter((equipment) => equipment.archived)
  .map((equipment) => equipment.name);

export function isActiveTemperatureEquipment(name: string) {
  return temperatureEquipment.some((equipment) => equipment.name === name && equipment.active);
}

export function isArchivedTemperatureEquipment(name: string) {
  return archivedTemperatureEquipment.includes(name);
}

export function getTemperatureEquipment(name: string) {
  return temperatureEquipment.find((equipment) => equipment.name === name);
}

export function getAcceptableRange(kind: TemperatureEquipmentKind) {
  return kind === "freezer" ? "-25 ºC a -18 ºC" : "0 ºC a 5 ºC";
}

export function evaluateTemperature(equipmentName: string, temperature: number): TemperatureEvaluation {
  const equipment = getTemperatureEquipment(equipmentName);
  const kind = equipment?.kind || "refrigerated";
  const acceptableRange = getAcceptableRange(kind);

  if (!equipment || !equipment.active) {
    return {
      status: "incidencia",
      alertLevel: "incidencia",
      acceptableRange,
      message: "Incidencia: posible fallo de equipo",
    };
  }

  if (kind === "freezer") {
    if (temperature > -15) {
      return {
        status: "incidencia",
        alertLevel: "incidencia",
        acceptableRange,
        message: "Incidencia: posible fallo de equipo",
      };
    }

    if (temperature > -18) {
      return {
        status: "revisar",
        alertLevel: "aviso",
        acceptableRange,
        message: "Revisar temperatura",
      };
    }

    return {
      status: "correcto",
      acceptableRange,
      message: "Correcto",
    };
  }

  if (temperature > 8) {
    return {
      status: "incidencia",
      alertLevel: "incidencia",
      acceptableRange,
      message: "Incidencia: posible fallo de equipo",
    };
  }

  if (temperature > 5) {
    return {
      status: "revisar",
      alertLevel: "aviso",
      acceptableRange,
      message: "Revisar temperatura",
    };
  }

  if (temperature < 0) {
    return {
      status: "revisar",
      alertLevel: "aviso",
      acceptableRange,
      message: "Revisar temperatura",
    };
  }

  return {
    status: "correcto",
    acceptableRange,
    message: "Correcto",
  };
}
