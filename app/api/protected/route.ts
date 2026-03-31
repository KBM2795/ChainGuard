import { NextResponse } from "next/server";
import { ethers } from "ethers";
import crypto from "crypto";
import { API_KEY_REGISTRY_ABI, CONTRACT_ADDRESS } from "@/lib/contract";

export async function GET(request: Request) {
    try {
        // 1. Extract Headers (API Key and Wallet Address)
        const authHeader = request.headers.get("authorization");
        const walletAddress = request.headers.get("x-wallet-address");

        if (!authHeader || !authHeader.startsWith("Bearer ") || !walletAddress) {
            return NextResponse.json(
                { error: "Missing 'Authorization' Bearer token or 'X-Wallet-Address' header" },
                { status: 401 }
            );
        }

        const rawApiKey = authHeader.replace("Bearer ", "");

        // 2. Hash the raw API key securely on the backend using standard SHA-256
        const hashBuffer = crypto.createHash('sha256').update(rawApiKey).digest();
        const keyHash = "0x" + hashBuffer.toString('hex');

        console.log("[DEBUG /api/protected] Raw key received:", rawApiKey.slice(0, 16) + "...");
        console.log("[DEBUG /api/protected] Computed hash:", keyHash);
        console.log("[DEBUG /api/protected] Wallet address:", walletAddress);
        console.log("[DEBUG /api/protected] Contract:", CONTRACT_ADDRESS);

        // 3. Connect to Sepolia and Verify with Smart Contract
        if (!process.env.SEPOLIA_RPC_URL) {
            throw new Error("RPC URL not configured");
        }

        const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
        const contract = new ethers.Contract(CONTRACT_ADDRESS, API_KEY_REGISTRY_ABI, provider);

        // Call the smart contract (read-only, costs no gas)
        const isValid = await contract.verifyOwner(keyHash, walletAddress);
        console.log("[DEBUG /api/protected] Contract returned isValid:", isValid);

        if (!isValid) {
            return NextResponse.json(
                { error: "Unauthorized: Invalid, Revoked, or Mismatched API Key." },
                { status: 403 }
            );
        }

        // 4. Success! Return protected data
        return NextResponse.json({
            success: true,
            message: "Access Granted! Your blockchain-verified API key is valid.",
            data: {
                secretData: "Antigravity protocols are online.",
                timestamp: new Date().toISOString()
            }
        });

    } catch (error) {
        console.error("Test API Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
