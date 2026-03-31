"use client";

import { useAccount } from "wagmi";
import { KeyTable } from "@/components/KeyTable";
import { GenerateKeyModal } from "@/components/GenerateKeyModal";
import { useState, useCallback } from "react";

export default function DashboardPage() {
    const { address } = useAccount();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);

    const handleModalClose = useCallback(() => {
        setIsModalOpen(false);
        // Trigger KeyTable to re-fetch from blockchain
        setRefreshKey(prev => prev + 1);
    }, []);

    return (
        <div className="max-w-[1100px] mx-auto pb-12">

            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold tracking-tight">API Keys</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 bg-[#3b82f6] hover:bg-[#2563eb] px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors"
                >
                    + Create new API key
                </button>
            </div>

            {/* Keys Table */}
            <div className="bg-[#111111] rounded-xl border border-[#222222] overflow-hidden">
                <KeyTable address={address} refreshKey={refreshKey} />
            </div>

            <GenerateKeyModal isOpen={isModalOpen} onClose={handleModalClose} />
        </div>
    );
}
