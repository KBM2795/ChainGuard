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

        // Connect to Ethereum Sepolia using Alchemy/RPC
        const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
        // Server acts as a relayer paying for gas
        const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
        const contract = new ethers.Contract(CONTRACT_ADDRESS, API_KEY_REGISTRY_ABI, wallet);

        // Call smart contract
        // We assume the contract allows the relayer to register on behalf of the owner
        const tx = await contract.registerKeyHash(keyHash, owner);

        // We don't wait for confirmation here to keep UI fast, 
        // we return the txHash immediately so UI can show pending state
        return NextResponse.json({ success: true, txHash: tx.hash });

    } catch (error: unknown) {
        console.error("Failed to register key:", error);

        // Handle specific smart contract revert errors gracefully
        const err = error as any;
        if (err.reason || err.message) {
            return NextResponse.json({ error: err.reason || "Smart contract execution failed" }, { status: 500 });
        }

        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
