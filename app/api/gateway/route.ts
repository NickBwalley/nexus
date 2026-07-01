import { NextResponse } from "next/server";
import { runGateway } from "@/lib/gateway/run";
import { gatewaySchema } from "@/lib/validations";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = gatewaySchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid gateway request", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  try {
    const result = await runGateway(parsed.data);
    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Gateway execution failed" }, { status: 500 });
  }
}
