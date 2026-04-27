"use client";

import { useAccount, useEnsName } from "wagmi";
import { Sidebar } from "@/components/Sidebar";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { isConnected, address } = useAccount();
    const { data: ensName } = useEnsName({ address });

    // Removed strict isConnected constraint to allow users to view the dashboard UI without a wallet

    const displayName = ensName || (address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "");

    return (
        <div className="flex min-h-screen bg-[#000000] text-white font-sans">
            <Sidebar />
            <div className="flex-1 flex flex-col min-h-screen">
                <header className="h-16 border-b border-[#222222] flex items-center justify-between px-6 bg-[#0a0a0a] sticky top-0 z-40">
                    <p className="text-sm text-white/50">
                        Connected as <span className="font-mono text-white/80 bg-white/5 px-2 py-0.5 rounded">{displayName}</span>
                    </p>
                    <ConnectButton chainStatus="icon" showBalance={false} accountStatus="address" />
                </header>
                <main className="flex-1 overflow-y-auto px-6 py-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
