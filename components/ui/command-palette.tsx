"use client";

import { useEffect, useState, useCallback } from "react";
import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import {
  Search,
  Home,
  Box,
  Wrench,
  FileText,
  Mail,
  Users,
  GraduationCap,
  ExternalLink,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const pages = [
  { name: "Home", href: "/", icon: Home, keywords: ["main", "landing"] },
  { name: "Products", href: "/products", icon: Box, keywords: ["software", "solutions"] },
  { name: "Services", href: "/services", icon: Wrench, keywords: ["consulting", "development"] },
  { name: "Blog", href: "/blogs", icon: FileText, keywords: ["articles", "news"] },
  { name: "Contact", href: "/contact", icon: Mail, keywords: ["reach", "support"] },
  { name: "About", href: "/about", icon: Users, keywords: ["team", "company"] },
  { name: "Training", href: "/training", icon: GraduationCap, keywords: ["courses", "learning"] },
];

const products = [
  { name: "TrustMeHub", href: "/products/trustmehub", keywords: ["trust", "compliance"] },
  { name: "BoaCRM", href: "/products/boacrm", keywords: ["crm", "sales"] },
  { name: "DigiTrack", href: "/products/digitrack", keywords: ["tracking", "analytics"] },
  { name: "DigiGate", href: "/products/digigate", keywords: ["security", "access"] },
  { name: "DigiTrust", href: "/products/digitrust", keywords: ["verification", "identity"] },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const locale = useLocale();

  // Toggle on Cmd+K or Ctrl+K
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = useCallback((command: () => void) => {
    setOpen(false);
    command();
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={() => setOpen(false)}
          />

          {/* Command Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-lg z-50"
          >
            <Command className="rounded-xl bg-white dark:bg-zinc-900 shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
              <div className="flex items-center border-b border-zinc-200 dark:border-zinc-800 px-4">
                <Search className="w-5 h-5 text-zinc-400" />
                <Command.Input
                  placeholder="Search pages, products, actions..."
                  className="w-full py-4 px-3 bg-transparent outline-none text-zinc-900 dark:text-white placeholder:text-zinc-400"
                />
                <kbd className="hidden sm:flex items-center gap-1 px-2 py-1 text-xs text-zinc-400 bg-zinc-100 dark:bg-zinc-800 rounded">
                  ESC
                </kbd>
              </div>

              <Command.List className="max-h-[300px] overflow-y-auto p-2">
                <Command.Empty className="py-6 text-center text-zinc-500">
                  No results found.
                </Command.Empty>

                <Command.Group heading="Pages" className="text-xs text-zinc-500 px-2 py-1.5">
                  {pages.map((page) => (
                    <Command.Item
                      key={page.href}
                      value={`${page.name} ${page.keywords.join(" ")}`}
                      onSelect={() => runCommand(() => router.push(`/${locale}${page.href}`))}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer aria-selected:bg-primary/10 aria-selected:text-primary"
                    >
                      <page.icon className="w-4 h-4" />
                      {page.name}
                    </Command.Item>
                  ))}
                </Command.Group>

                <Command.Group heading="Products" className="text-xs text-zinc-500 px-2 py-1.5 mt-2">
                  {products.map((product) => (
                    <Command.Item
                      key={product.href}
                      value={`${product.name} ${product.keywords.join(" ")}`}
                      onSelect={() => runCommand(() => router.push(`/${locale}${product.href}`))}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer aria-selected:bg-primary/10 aria-selected:text-primary"
                    >
                      <Box className="w-4 h-4" />
                      {product.name}
                      <ExternalLink className="w-3 h-3 ml-auto opacity-50" />
                    </Command.Item>
                  ))}
                </Command.Group>
              </Command.List>
            </Command>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
