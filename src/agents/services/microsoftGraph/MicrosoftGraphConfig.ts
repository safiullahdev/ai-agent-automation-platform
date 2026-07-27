export interface MicrosoftGraphConfig {
  tenantId: string;
  clientId: string;
  clientSecret: string;
}

export function loadMicrosoftGraphConfig(): MicrosoftGraphConfig {
  const tenantId = process.env.MICROSOFT_GRAPH_TENANT_ID;
  const clientId = process.env.MICROSOFT_GRAPH_CLIENT_ID;
  const clientSecret = process.env.MICROSOFT_GRAPH_CLIENT_SECRET;

  if (!tenantId || !clientId || !clientSecret) {
    throw new Error(
      "Microsoft Graph configuration is missing required environment variables."
    );
  }

  return {
    tenantId,
    clientId,
    clientSecret,
  };
}