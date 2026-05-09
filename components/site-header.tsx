import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/8 bg-background/75 backdrop-blur-2xl">
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group flex items-center gap-3 text-sm font-semibold tracking-wide"
        >
          <span className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 transition-all duration-300 group-hover:border-primary/60 group-hover:shadow-glow-blue">
            <span className="h-2.5 w-2.5 rotate-45 border border-accent/70 bg-accent/15 transition-all duration-300 group-hover:bg-accent/30" />
          </span>
          <span className="text-gradient font-bold">Firstbase</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {[
            { label: "Builder", href: "/builder", internal: true },
            {
              label: "npm",
              href: "https://www.npmjs.com/package/create-firstbase-app?activeTab=readme",
              internal: false,
            },
            {
              label: "GitHub",
              href: "https://github.com/Akshay-bendadi/firstbase",
              internal: false,
            },
          ].map((link) =>
            link.internal ? (
              <Link
                key={link.label}
                href={link.href}
                className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-all duration-200 hover:bg-secondary/60 hover:text-foreground"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-all duration-200 hover:bg-secondary/60 hover:text-foreground"
              >
                {link.label}
              </a>
            ),
          )}
        </nav>

        <Link
          href="/builder"
          className="group relative inline-flex min-h-9 items-center justify-center gap-2 overflow-hidden rounded-lg border border-primary/40 bg-primary/10 px-5 text-sm font-medium text-primary transition-all duration-200 hover:border-primary/70 hover:bg-primary/20 hover:shadow-glow-blue"
        >
          <span className="relative z-10">Open Builder</span>
          <span className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        </Link>
      </div>
    </header>
  );
}
