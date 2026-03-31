"use client";

import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { ArrowRight, Shield, Zap, Code, Key, Lock, ChevronRight } from "lucide-react";

export default function LandingPage() {
  return (
    <main className="min-h-screen relative overflow-hidden flex flex-col bg-[#000000]">
      <Navbar />

      {/* Hero */}
      <section className="pt-40 pb-32 px-6 flex-1 flex flex-col justify-center relative z-10 w-full max-w-7xl mx-auto">

        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-[#3b82f6] rounded-full blur-[200px] opacity-10 pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#8b5cf6] rounded-full blur-[200px] opacity-10 pointer-events-none"></div>

        <div className="text-center max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.06] mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs font-medium text-white/60 tracking-wide">Live on Sepolia Testnet</span>
          </div>

          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-[-0.04em] mb-6 leading-[0.95]">
            <span className="text-white">Secure your</span><br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3b82f6] via-[#8b5cf6] to-[#ec4899]">
              API keys
            </span>
            <br />
            <span className="text-white">on-chain.</span>
          </h1>

          <p className="text-base md:text-lg text-white/40 mb-12 max-w-xl mx-auto leading-relaxed">
            Generate cryptographic API keys, hash them locally in your browser, and register ownership permanently on the Ethereum blockchain.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/dashboard"
              className="group w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-black font-bold transition-all text-sm flex items-center justify-center gap-2 hover:bg-white/90"
            >
              Open Dashboard
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <a
              href="#features"
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-white/60 hover:text-white font-medium transition-all text-sm flex items-center justify-center gap-1"
            >
              Learn more <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Code preview */}
        <div className="mt-20 max-w-2xl mx-auto w-full">
          <div className="bg-[#0a0a0a] border border-white/[0.06] rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06]">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
              <div className="w-3 h-3 rounded-full bg-[#28c840]"></div>
              <span className="ml-2 text-xs text-white/30 font-mono">verify-key.ts</span>
            </div>
            <pre className="p-6 text-sm font-mono leading-relaxed overflow-x-auto">
              <code>
                <span className="text-[#c678dd]">const</span> <span className="text-[#e06c75]">response</span> <span className="text-white/60">=</span> <span className="text-[#c678dd]">await</span> <span className="text-[#61afef]">fetch</span><span className="text-white/40">(</span><span className="text-[#98c379]">&quot;/api/protected&quot;</span><span className="text-white/40">, &#123;</span>{"\n"}
                {"  "}<span className="text-[#e06c75]">headers</span><span className="text-white/40">: &#123;</span>{"\n"}
                {"    "}<span className="text-[#98c379]">&quot;Authorization&quot;</span><span className="text-white/40">:</span> <span className="text-[#98c379]">`Bearer $&#123;apiKey&#125;`</span><span className="text-white/40">,</span>{"\n"}
                {"    "}<span className="text-[#98c379]">&quot;X-Wallet-Address&quot;</span><span className="text-white/40">:</span> <span className="text-[#e06c75]">walletAddress</span>{"\n"}
                {"  "}<span className="text-white/40">&#125;</span>{"\n"}
                <span className="text-white/40">&#125;);</span>{"\n"}
                {"\n"}
                <span className="text-white/30">{"// ✅ Verified on-chain — Access Granted"}</span>
              </code>
            </pre>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-32 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">How it works</h2>
            <p className="text-white/40 max-w-lg mx-auto">Three simple steps to decentralized API key management.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.06] rounded-2xl overflow-hidden">
            <div className="p-10 bg-[#0a0a0a] group">
              <div className="w-10 h-10 rounded-lg bg-[#3b82f6]/10 text-[#3b82f6] flex items-center justify-center mb-6">
                <Key className="w-5 h-5" />
              </div>
              <div className="text-xs font-mono text-white/30 mb-3">01</div>
              <h3 className="text-lg font-bold mb-2">Generate</h3>
              <p className="text-white/40 text-sm leading-relaxed">
                A cryptographically secure 256-bit key is generated entirely inside your browser. Never touches a server.
              </p>
            </div>
            <div className="p-10 bg-[#0a0a0a] group">
              <div className="w-10 h-10 rounded-lg bg-[#8b5cf6]/10 text-[#8b5cf6] flex items-center justify-center mb-6">
                <Lock className="w-5 h-5" />
              </div>
              <div className="text-xs font-mono text-white/30 mb-3">02</div>
              <h3 className="text-lg font-bold mb-2">Hash & Register</h3>
              <p className="text-white/40 text-sm leading-relaxed">
                The key is SHA-256 hashed locally, and the hash is permanently registered on-chain to your wallet address.
              </p>
            </div>
            <div className="p-10 bg-[#0a0a0a] group">
              <div className="w-10 h-10 rounded-lg bg-[#10b981]/10 text-[#10b981] flex items-center justify-center mb-6">
                <Shield className="w-5 h-5" />
              </div>
              <div className="text-xs font-mono text-white/30 mb-3">03</div>
              <h3 className="text-lg font-bold mb-2">Verify</h3>
              <p className="text-white/40 text-sm leading-relaxed">
                Any backend can verify key ownership by hashing the raw key and checking it against the smart contract. Zero trust needed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-6 border-t border-white/[0.04]">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-white mb-1">256-bit</div>
            <div className="text-xs text-white/30 uppercase tracking-wider">Key Entropy</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white mb-1">SHA-256</div>
            <div className="text-xs text-white/30 uppercase tracking-wider">Hash Algorithm</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white mb-1">Sepolia</div>
            <div className="text-xs text-white/30 uppercase tracking-wider">Network</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white mb-1">0 Gas</div>
            <div className="text-xs text-white/30 uppercase tracking-wider">For Verification</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-xs text-white/30">
          <p>© 2026 ChainGuard. Built on Ethereum.</p>
          <div className="flex gap-6 mt-3 md:mt-0">
            <a href="#" className="hover:text-white/60 transition-colors">GitHub</a>
            <a href="#" className="hover:text-white/60 transition-colors">Docs</a>
            <a href="#" className="hover:text-white/60 transition-colors">Etherscan</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
