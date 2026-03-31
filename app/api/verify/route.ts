import { NextResponse } from "next/server";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, API_KEY_REGISTRY_ABI } from "@/lib/contract";

export async function POST(req: Request) {
    try {
        const { keyHash, owner } = await req.json();

        if (!keyHash || !owner) {
            return NextResponse.json({ error: "Missing keyHash or owner" }, { status: 400 });
        }

        if (!process.env.SEPOLIA_RPC_URL) {
            return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
        }

        // Connect to Ethereum Sepolia
        const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
        // We only need provider for read-only 'verifyOwner' call
        const contract = new ethers.Contract(CONTRACT_ADDRESS, API_KEY_REGISTRY_ABI, provider);

        // Call smart contract view function
        const isValid = await contract.verifyOwner(keyHash, owner);

        return NextResponse.json({ success: true, isValid });

    } catch (error: unknown) {
        console.error("Failed to verify key:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
