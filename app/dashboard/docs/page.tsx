"use client";

import React from 'react';

export default function DocsPage() {
    return (
        <div className="max-w-4xl mx-auto pb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00d4ff] to-[#3b82f6] flex items-center justify-center shadow-[0_0_20px_rgba(0,212,255,0.3)]">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                </div>
                <h1 className="text-3xl font-bold tracking-tight">Documentation</h1>
            </div>

            {/* Explicit section for Protected Route requested by user */}
            <div className="bg-[#111111] border border-[#222222] rounded-xl p-8 mb-10 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-[#00d4ff]"></div>
                <h2 className="text-xl font-bold mb-4 text-[#00d4ff] flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    Testing the Protected Route
                </h2>
                <p className="text-white/70 mb-5 leading-relaxed">
                    ChainGuard uses a demonstration protected API route <code className="bg-white/10 px-1.5 py-0.5 rounded text-[#00d4ff] mx-1">/api/protected</code> to verify the ownership of an API key locally, backed by the remote blockchain contract.
                </p>
                <div className="bg-[#000000] border border-[#222222] rounded-lg p-5 mb-5 font-mono text-sm overflow-x-auto text-green-400 shadow-inner">
                    <pre className="whitespace-pre-wrap">
                        {`curl -X GET http://localhost:3000/api/protected \\
  -H "Authorization: Bearer YOUR_RAW_API_KEY" \\
  -H "X-Wallet-Address: 0xYOUR_WALLET_ADDRESS"`}
                    </pre>
                </div>
                <div className="flex gap-3 text-white/50 text-sm bg-white/[0.02] p-4 rounded-lg border border-white/5">
                    <svg className="w-5 h-5 flex-shrink-0 text-[#3b82f6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p>
                        <strong>Important:</strong> Provide the <strong>raw API key</strong> created in your dashboard, NOT the "0x" hash structure. The backend intercepts your raw string, creates the SHA-256 hash using crypto, and asks Sepolia if that owner correctly owns the hash.
                    </p>
                </div>
            </div>

            {/* Readme content */}
            <div className="space-y-10">
                <section>
                    <h2 className="text-2xl font-bold border-b border-[#222222] pb-3 mb-5 flex items-center gap-2">
                        ChainGuard Overview
                    </h2>
                    <p className="text-white/70 leading-relaxed text-lg mb-6">
                        A secure, decentralized API key management dApp built on the Ethereum Sepolia Testnet. Generate cryptographic keys completely locally in your browser context, register their hashes on-chain, and verify ownership through blockchain-gated API routes.
                    </p>

                    <h3 className="text-xl font-bold mb-4 text-white/90">Architecture</h3>
                    <div className="bg-[#000000] border border-[#222222] rounded-lg p-5 font-mono text-sm overflow-x-auto text-white/80 shadow-md">
                        <pre>
                            {`Browser (Web Crypto API)         Backend (Next.js)         Blockchain (Sepolia)
┌─────────────────────┐         ┌──────────────────┐         ┌─────────────────────┐
│ Generate 256-bit key│         │ /api/register    │         │ APIKeyRegistry.sol  │
│ SHA-256 hash locally│ ──────► │ Relayer pays gas │ ──────► │ registerKeyHash()   │
│ Show key ONCE       │         │ /api/protected   │         │ verifyOwner()       │
│                     │         │ Hash + verify    │ ◄────── │ revokeKey()         │
└─────────────────────┘         └──────────────────┘         └─────────────────────┘`}
                        </pre>
                    </div>
                </section>

                <section>
                    <h3 className="text-xl font-bold mb-4 text-white/90">Smart Contract Integration</h3>
                    <p className="text-white/70 mb-4 bg-white/5 inline-block px-3 py-1.5 rounded-lg font-mono text-sm">
                        Address: 0x950AACf33014e9924191f0deD6CEdbb515D347B2
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                        <div className="bg-[#111111] p-4 rounded-lg border border-[#222222]">
                            <code className="text-[#3b82f6] text-sm block mb-2 font-bold">registerKeyHash(bytes32, address)</code>
                            <p className="text-white/60 text-sm">Write operation. Registers a new SHA-256 hash to a particular ownership address.</p>
                        </div>
                        <div className="bg-[#111111] p-4 rounded-lg border border-[#222222]">
                            <code className="text-red-400 text-sm block mb-2 font-bold">revokeKey(bytes32, address)</code>
                            <p className="text-white/60 text-sm">Write operation. Permanently invalidates the API key hash forever. Action is irreversible.</p>
                        </div>
                        <div className="bg-[#111111] p-4 rounded-lg border border-[#222222]">
                            <code className="text-green-400 text-sm block mb-2 font-bold">verifyOwner(bytes32, address)</code>
                            <p className="text-white/60 text-sm">Read operation (Gasless). Confirms whether the provided hash maps to the supplied address.</p>
                        </div>
                    </div>
                </section>

                <section>
                    <h3 className="text-xl font-bold mb-4 text-white/90">Other API Endpoints</h3>

                    <div className="space-y-6">
                        <div>
                            <h4 className="font-semibold mb-2 text-white/80 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff]"></span>
                                Register a Key Hash
                            </h4>
                            <div className="bg-[#000000] border border-[#222222] rounded-lg p-4 font-mono text-sm overflow-x-auto text-white/60">
                                <pre>
                                    {`curl -X POST http://localhost:3000/api/register \\
  -H "Content-Type: application/json" \\
  -d '{"keyHash": "0xYOUR_HASH", "owner": "0xYOUR_WALLET"}'`}
                                </pre>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-2 text-white/80 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                                Check Database Status Manually
                            </h4>
                            <div className="bg-[#000000] border border-[#222222] rounded-lg p-4 font-mono text-sm overflow-x-auto text-white/60">
                                <pre>
                                    {`curl -X POST http://localhost:3000/api/verify \\
  -H "Content-Type: application/json" \\
  -d '{"keyHash": "0xYOUR_HASH", "owner": "0xYOUR_WALLET"}'`}
                                </pre>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-2 text-white/80 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
                                Trigger Revocation via Relayer
                            </h4>
                            <div className="bg-[#000000] border border-[#222222] rounded-lg p-4 font-mono text-sm overflow-x-auto text-white/60">
                                <pre>
                                    {`curl -X POST http://localhost:3000/api/revoke \\
  -H "Content-Type: application/json" \\
  -d '{"keyHash": "0xYOUR_HASH", "owner": "0xYOUR_WALLET"}'`}
                                </pre>
                            </div>
                        </div>
                    </div>
                </section>

                <section>
                    <div className="bg-gradient-to-r from-orange-500/10 to-transparent border border-orange-500/20 rounded-xl p-6 relative">
                        <h3 className="text-xl font-bold mb-4 text-orange-500 flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            Security Architecture
                        </h3>
                        <ul className="list-disc pl-6 text-orange-500/80 space-y-2 marker:text-orange-500/50">
                            <li>Raw API keys are generated solely within your specific browser session and <strong>are fundamentally invisible to our server.</strong></li>
                            <li>We only commit irreversible SHA-256 hashes onto the Sepolia Ethereum Ledger.</li>
                            <li>All transaction (gas) fees are sponsored via our backend API relay architecture.</li>
                            <li>Data lookups checking mapping validity is a read-only unmetered gasless call.</li>
                            <li>Registered API keys permanently bind to a single Wallet ID entity mapping immutable ownership.</li>
                        </ul>
                    </div>
                </section>
            </div>
        </div>
    );
}
