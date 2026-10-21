import { createOpenAICompatible } from "@ai-sdk/openai-compatible";

export function createLovableAiGatewayProvider(apiKey: string) {
  return createOpenAICompatible({
    name: "lovable",
    baseURL: "https://api.openai.com/v1",
    headers: {
      "Lovable-API-Key":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,
      "X-Lovable-AIG-SDK": "vercel-ai-sdk",
    },
  });
}
