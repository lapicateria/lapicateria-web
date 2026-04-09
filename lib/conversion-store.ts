import { promises as fs } from "node:fs";
import path from "node:path";
import type { ConversionConfig } from "@/lib/conversion";

const SETTINGS_PATH = path.join(process.cwd(), "content", "conversion-settings.json");
const KV_KEY = process.env.CONVERSION_SETTINGS_KV_KEY ?? "lapicateria:conversion-settings";

function canUseKv() {
  return Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
}

async function runKvCommand<T>(command: unknown[]): Promise<T | null> {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;

  if (!url || !token) {
    return null;
  }

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("No se ha podido conectar con el almacenamiento remoto de conversión.");
  }

  const payload = (await response.json()) as { result?: T; error?: string };

  if (payload.error) {
    throw new Error(payload.error);
  }

  return payload.result ?? null;
}

export async function readStoredConversionConfig(): Promise<ConversionConfig | null> {
  if (canUseKv()) {
    const raw = await runKvCommand<string>(["GET", KV_KEY]);
    if (!raw) {
      return null;
    }

    return JSON.parse(raw) as ConversionConfig;
  }

  if (process.env.NODE_ENV !== "production") {
    try {
      const raw = await fs.readFile(SETTINGS_PATH, "utf8");
      return JSON.parse(raw) as ConversionConfig;
    } catch {
      return null;
    }
  }

  return null;
}

export async function writeStoredConversionConfig(config: ConversionConfig) {
  if (canUseKv()) {
    await runKvCommand(["SET", KV_KEY, JSON.stringify(config)]);
    return;
  }

  if (process.env.NODE_ENV !== "production") {
    await fs.writeFile(SETTINGS_PATH, `${JSON.stringify(config, null, 2)}\n`, "utf8");
    return;
  }

  throw new Error(
    "No hay persistencia remota configurada. En producción necesitas KV_REST_API_URL y KV_REST_API_TOKEN.",
  );
}
