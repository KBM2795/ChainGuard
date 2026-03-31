"use client";

import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { motion } from "framer-motion";

export function Navbar() {
    return (
        <motion.nav
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="fixed top-0 w-full z-50 glass border-b border-white/5"
        >
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <span className="font-bold text-xl tracking-tight text-white group-hover:glow-text transition-all">
                        ChainQuard
                    </span>
                    <span className="text-xs font-medium text-white/60 tracking-wide">API Key Manager</span>
                </Link>

                <div className="flex items-center gap-6">
                    <Link href="/dashboard" className="text-sm font-medium text-white/70 hover:text-[#00d4ff] transition-colors">
                        Dashboard
                    </Link>
                    <ConnectButton
                        chainStatus="icon"
                        showBalance={false}
                        accountStatus="address"
                    />
                </div>
            </div>
        </motion.nav>
    );
}
