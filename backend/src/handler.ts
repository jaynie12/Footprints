export interface ApiGatewayResponse {
  statusCode: number;
  headers: Record<string, string>;
  body: string;
}

export async function handler(event: unknown): Promise<ApiGatewayResponse> {
  void event;

  return {
    statusCode: 200,
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ status: 'ok' }),
  };
}
