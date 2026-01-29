/// <reference types="vite/client" />

declare global {
  interface Window {
    klaviyo?: {
      identify: (properties: Record<string, unknown>) => void;
      track: (event: string, properties?: Record<string, unknown>) => void;
      push: (args: unknown[]) => void;
    };
  }
}

export {};
