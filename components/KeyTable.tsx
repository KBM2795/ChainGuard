"use client";

import { useState, useEffect } from "react";
import { usePublicClient } from "wagmi";
import { CONTRACT_ADDRESS } from "@/lib/contract";
import { Copy, Trash2 } from "lucide-react";
import { parseAbiItem } from "viem";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export function KeyTable({ address, refreshKey }: { address?: string; refreshKey?: number }) {
    const [loading, setLoading] = useState(true);
    const [keys, setKeys] = useState<{ hash: string; timestamp: number; active: boolean }[]>([]);
    const [revoking, setRevoking] = useState<string | null>(null);
    const publicClient = usePublicClient();

    useEffect(() => {
        if (!address || !publicClient) return;
        setLoading(true);

        async function fetchKeys() {
            if (!publicClient) return;
            try {
                // RPC providers limit eth_getLogs range, so scan last 10k blocks
                const currentBlock = await publicClient.getBlockNumber();
                const fromBlock = currentBlock > BigInt(999) ? currentBlock - BigInt(999) : BigInt(0);

                const registeredLogs = await publicClient.getLogs({
                    address: CONTRACT_ADDRESS as `0x${string}`,
                    event: parseAbiItem("event KeyRegistered(bytes32 indexed keyHash, address indexed owner, uint256 timestamp)"),
                    args: { owner: address as `0x${string}` },
                    fromBlock,
                    toBlock: "latest"
                });

                const revokedLogs = await publicClient.getLogs({
                    address: CONTRACT_ADDRESS as `0x${string}`,
                    event: parseAbiItem("event KeyRevoked(bytes32 indexed keyHash, address indexed owner)"),
                    args: { owner: address as `0x${string}` },
                    fromBlock,
                    toBlock: "latest"
                });

                const revokedHashes = new Set(revokedLogs.map(log => log.args.keyHash));

                const userKeys = registeredLogs.map(log => ({
                    hash: log.args.keyHash as string,
                    timestamp: Number(log.args.timestamp) * 1000,
                    active: !revokedHashes.has(log.args.keyHash)
                }));

                const uniqueKeys = Array.from(new Map(userKeys.map(k => [k.hash, k])).values());
                uniqueKeys.sort((a, b) => b.timestamp - a.timestamp);

                setKeys(uniqueKeys);
            } catch (err) {
                console.error("Failed to fetch on-chain keys:", err);
            } finally {
                setLoading(false);
            }
        }

        fetchKeys();
    }, [address, publicClient, refreshKey]);

    const handleRevoke = async (keyHash: string) => {
        if (!address || !window.confirm("Are you sure you want to revoke this API Key? This cannot be undone.")) return;

        setRevoking(keyHash);
        try {
            const res = await fetch("/api/revoke", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ keyHash, owner: address }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Revocation failed");

            alert("Revocation TX sent: " + data.txHash);
            setKeys(prev => prev.map(k => k.hash === keyHash ? { ...k, active: false } : k));
        } catch (err: unknown) {
            alert((err as Error).message || "Failed to revoke key");
        } finally {
            setRevoking(null);
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    if (!address) {
        return (
            <div className="flex flex-col items-center justify-center p-16 gap-4">
                <h2 className="text-xl font-semibold text-white/90">Connect your wallet</h2>
                <p className="text-sm text-white/50 mb-4">Please connect your wallet to manage your API keys.</p>
                <ConnectButton showBalance={false} />
            </div>
        );
    }

    if (loading) {
        return <div className="p-8 text-center text-white/40 animate-pulse">Scanning blockchain for your keys...</div>;
    }

    return (
        <div className="w-full overflow-x-auto">
            <table className="w-full text-left text-sm">
                <thead className="text-xs text-white/40 uppercase border-b border-[#222222]">
                    <tr>
                        <th className="px-6 py-4 font-semibold">Name</th>
                        <th className="px-6 py-4 font-semibold">Key Hash</th>
                        <th className="px-6 py-4 font-semibold">Status</th>
                        <th className="px-6 py-4 font-semibold">Created</th>
                        <th className="px-6 py-4 font-semibold">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-[#222222]">
                    {keys.length === 0 ? (
                        <tr>
                            <td colSpan={5} className="px-6 py-12 text-center text-white/40">
                                No API keys found. Create one to get started.
                            </td>
                        </tr>
                    ) : (
                        keys.map((key, i) => (
                            <tr key={key.hash} className="hover:bg-white/[0.03] transition-colors">
                                <td className="px-6 py-4 font-medium text-white">
                                    API Key {keys.length - i}
                                </td>
                                <td className="px-6 py-4">
                                    <span className="font-mono text-white/50 text-xs">
                                        {key.hash.slice(0, 10)}...{key.hash.slice(-6)}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${key.active ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"}`}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${key.active ? "bg-green-400" : "bg-red-400"}`}></span>
                                        {key.active ? "Active" : "Revoked"}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-white/50 text-xs">
                                    {new Date(key.timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => copyToClipboard(key.hash)}
                                            className="text-white/40 hover:text-white transition-colors"
                                            title="Copy Hash"
                                        >
                                            <Copy className="w-4 h-4" />
                                        </button>

                                        {key.active && (
                                            <button
                                                onClick={() => handleRevoke(key.hash)}
                                                disabled={revoking === key.hash}
                                                className="text-red-400/60 hover:text-red-400 transition-colors disabled:opacity-50"
                                                title="Revoke Key"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
