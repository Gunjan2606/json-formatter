import { NextRequest, NextResponse } from "next/server";
import Irys from "@irys/sdk";

const MAX_SHARE_BYTES = 100 * 1024; // 100KB

const getIrys = async () => {
  const network = process.env.IRYS_NETWORK || "devnet";
  const token = process.env.IRYS_TOKEN || "matic";
  const key = process.env.IRYS_PRIVATE_KEY;
  const providerUrl =
    process.env.IRYS_PROVIDER_URL || "https://rpc-mumbai.maticvigil.com";

  if (!key) {
    throw new Error(
      "IRYS_PRIVATE_KEY is not set. Configure your Irys credentials in environment variables."
    );
  }

  const irys = new Irys({
    network,
    token,
    key,
    config: { providerUrl },
  });

  return irys;
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);

    if (!body || typeof body.data !== "string") {
      return NextResponse.json(
        { error: "Invalid request body. Expected JSON with a 'data' string." },
        { status: 400 }
      );
    }

    const data: string = body.data;
    const byteSize = new Blob([data]).size;

    if (byteSize === 0) {
      return NextResponse.json(
        { error: "Cannot share empty JSON." },
        { status: 400 }
      );
    }

    if (byteSize > MAX_SHARE_BYTES) {
      return NextResponse.json(
        {
          error:
            "Shared JSON exceeds the 100KB limit. Please reduce the size and try again.",
        },
        { status: 400 }
      );
    }

    const irys = await getIrys();
    const receipt = await irys.upload(data);

    if (!receipt?.id) {
      throw new Error("Irys upload did not return a valid receipt ID.");
    }

    return NextResponse.json(
      {
        receiptId: receipt.id,
        gatewayUrl: `https://gateway.irys.xyz/${receipt.id}`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in /api/share:", error);
    const message =
      error instanceof Error ? error.message : "Unknown error while sharing.";

    return NextResponse.json(
      {
        error: message,
      },
      { status: 500 }
    );
  }
}

