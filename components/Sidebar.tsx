"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Key, BookOpen, HelpCircle, Settings } from "lucide-react";

export function Sidebar() {
    const pathname = usePathname();

    const navItems = [
        { name: "Dashboard", href: "/dashboard", icon: <Home className="w-5 h-5" /> },
        { name: "API Keys", href: "/dashboard", icon: <Key className="w-5 h-5" /> },
        { name: "Docs", href: "#", icon: <BookOpen className="w-5 h-5" /> },
        { name: "Help", href: "#", icon: <HelpCircle className="w-5 h-5" /> },
        { name: "Settings", href: "#", icon: <Settings className="w-5 h-5" /> },
    ];

    return (
        <aside className="w-60 bg-[#111111] border-r border-[#222222] hidden md:flex flex-col h-screen sticky top-0 left-0 pt-6 pb-4">
            {/* Logo */}
            <div className="px-6 mb-10">
                <Link href="/" className="flex flex-col">
                    <span className="text-xl font-bold tracking-tight text-white leading-none">ChainGuard</span>
                    <span className="text-xs text-white/50 mt-1">API Key Manager</span>
                </Link>
            </div>

            {/* Nav */}
            <nav className="flex-1 px-3 space-y-1">
                {navItems.map((item) => (
                    <Link key={item.name} href={item.href} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${pathname === item.href ? "bg-white/10 text-white" : "text-white/50 hover:text-white hover:bg-white/5"}`}>
                        {item.icon}
                        {item.name}
                    </Link>
                ))}
            </nav>
        </aside>
    );
}
