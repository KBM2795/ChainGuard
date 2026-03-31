"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Copy, CheckCircle, AlertTriangle, Loader2 } from "lucide-react";
import { useAccount } from "wagmi";

export function GenerateKeyModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    const { address } = useAccount();
    const [step, setStep] = useState<"initial" | "generating" | "generated" | "registering" | "success" | "error">("initial");
    const [rawKey, setRawKey] = useState("");
    const [keyHash, setKeyHash] = useState("");
    const [txHash, setTxHash] = useState("");
    const [copied, setCopied] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    // Reset state when opened
    useEffect(() => {
        if (isOpen) {
            setStep("initial");
            setRawKey("");
            setKeyHash("");
            setTxHash("");
            setCopied(false);
            setErrorMsg("");
        }
    }, [isOpen]);

    if (!isOpen) return null;

    async function handleGenerate() {
        try {
            setStep("generating");

            // 1. Generate random crypto string
            const array = new Uint8Array(32);
            window.crypto.getRandomValues(array);
            const key = "ak_live_" + Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
            setRawKey(key);

            // 2. Hash it with SHA-256
            const msgBuffer = new TextEncoder().encode(key);
            const hashBuffer = await window.crypto.subtle.digest('SHA-256', msgBuffer);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            const hashHex = '0x' + hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
            setKeyHash(hashHex);

            setStep("generated");
        } catch (err: unknown) {
            setErrorMsg((err as Error).message || "Failed to generate key");
            setStep("error");
        }
    }

    async function handleRegister() {
        try {
            setStep("registering");

            const response = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ keyHash, owner: address })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to register key on-chain");
            }

            setTxHash(data.txHash);
            setStep("success");

        } catch (err: unknown) {
            setErrorMsg((err as Error).message || "Failed during blockchain transaction");
            setStep("error");
        }
    }

    function copyToClipboard() {
        navigator.clipboard.writeText(rawKey);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="w-full max-w-md bg-[#0a0a0f] border border-white/10 rounded-2xl shadow-2xl overflow-hidden relative"
            >
                {/* Decorative glow */}
                <div className="absolute top-0 left-1/4 w-1/2 h-1 bg-gradient-to-r from-transparent via-[#00d4ff] to-transparent opacity-50" />

                <div className="p-6">
                    <h2 className="text-2xl font-bold text-white mb-2">Create New API Key</h2>

                    {step === "initial" && (
                        <>
                            <p className="text-white/60 mb-6 text-sm leading-relaxed">
                                By generating an API key here, a cryptographically secure key will be created on your device. Its SHA-256 hash will be registered permanently on the Ethereum Sepolia blockchain.
                            </p>
                            <div className="flex justify-end gap-3 mt-8">
                                <button onClick={onClose} className="px-4 py-2 text-white/70 hover:text-white transition-colors">Cancel</button>
                                <button onClick={handleGenerate} className="px-5 py-2 rounded-lg bg-[#7c3aed] hover:bg-[#6c2bd9] text-white font-medium transition-colors">Generate Secure Key</button>
                            </div>
                        </>
                    )}

                    {step === "generating" && (
                        <div className="py-12 flex flex-col items-center justify-center">
                            <Loader2 className="w-10 h-10 text-[#00d4ff] animate-spin mb-4" />
                            <p className="text-white/80">Generating secure cryptographics...</p>
                        </div>
                    )}

                    {step === "generated" && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl mb-6 flex items-start gap-3">
                                <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                                <p className="text-sm text-amber-200/90 leading-relaxed">
                                    <strong>Save this key now!</strong> It is generated locally and we do not store the raw key anywhere. Once you close this modal, you will never see it again.
                                </p>
                            </div>

                            <div className="mb-6 relative group">
                                <label className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-2 block">Your Raw API Key</label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        readOnly
                                        value={rawKey}
                                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 font-mono text-sm text-[#00d4ff] focus:outline-none"
                                    />
                                    <button
                                        onClick={copyToClipboard}
                                        className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white/70 hover:text-white transition-all"
                                    >
                                        {copied ? <CheckCircle className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            <div className="flex justify-end gap-3">
                                <button onClick={onClose} className="px-4 py-2 text-white/50 hover:text-white transition-colors text-sm">Cancel Registration</button>
                                <button
                                    onClick={handleRegister}
                                    className="px-5 py-2 rounded-lg glow-button text-white font-medium"
                                >
                                    Register On-Chain
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {step === "registering" && (
                        <div className="py-12 flex flex-col items-center justify-center">
                            <Loader2 className="w-10 h-10 text-[#7c3aed] animate-spin mb-4" />
                            <p className="text-white/80">Registering hash to Ethereum Sepolia...</p>
                            <p className="text-white/40 text-xs mt-2 font-mono">{keyHash.slice(0, 16)}...</p>
                        </div>
                    )}

                    {step === "success" && (
                        <div className="py-8 flex flex-col items-center justify-center text-center">
                            <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/50 flex items-center justify-center mb-4">
                                <CheckCircle className="w-8 h-8 text-green-400" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Registration Complete!</h3>
                            <p className="text-white/60 mb-6 text-sm">Your key has been permanently tied to your wallet on the Sepolia blockchain.</p>
                            <a
                                href={`https://sepolia.etherscan.io/tx/${txHash}`}
                                target="_blank"
                                rel="noreferrer"
                                className="text-[#00d4ff] hover:underline text-sm mb-8 block"
                            >
                                View Transaction on Etherscan
                            </a>
                            <button onClick={onClose} className="w-full py-3 rounded-lg bg-white/5 hover:bg-white/10 text-white font-medium transition-colors">
                                Back to Dashboard
                            </button>
                        </div>
                    )}

                    {step === "error" && (
                        <div className="py-8 flex flex-col items-center justify-center text-center">
                            <div className="w-16 h-16 rounded-full bg-red-500/20 border border-red-500/50 flex items-center justify-center mb-4">
                                <AlertTriangle className="w-8 h-8 text-red-400" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Transaction Failed</h3>
                            <p className="text-red-400/80 mb-6 text-sm max-w-[250px]">{errorMsg}</p>
                            <button onClick={() => setStep("generated")} className="w-full py-3 rounded-lg bg-white/5 hover:bg-white/10 text-white font-medium transition-colors">
                                Try Again
                            </button>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
}
