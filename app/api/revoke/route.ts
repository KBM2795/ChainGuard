import { NextResponse } from "next/server";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, API_KEY_REGISTRY_ABI } from "@/lib/contract";

export async function POST(req: Request) {
    try {
        const { keyHash, owner } = await req.json();

        if (!keyHash || !owner) {
            return NextResponse.json({ error: "Missing keyHash or owner" }, { status: 400 });
        }

        if (!process.env.PRIVATE_KEY || !process.env.SEPOLIA_RPC_URL) {
            return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
        }

        const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
        const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
        const contract = new ethers.Contract(CONTRACT_ADDRESS, API_KEY_REGISTRY_ABI, wallet);

        // Call smart contract to revoke
        // In our design, the relayer calls this specifying the owner
        const tx = await contract.revokeKey(keyHash, owner);

        return NextResponse.json({ success: true, txHash: tx.hash });

    } catch (error: unknown) {
        console.error("Failed to revoke key:", error);
        const err = error as any;
        if (err.reason || err.message) {
            return NextResponse.json({ error: err.reason || "Smart contract execution failed" }, { status: 500 });
        }

        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
