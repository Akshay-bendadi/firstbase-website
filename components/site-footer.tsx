export function SiteFooter() {
  return (
    <footer className="border-t border-white/6">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p className="font-mono text-xs uppercase tracking-widest">Firstbase</p>
        <a
          href="https://github.com/Akshay-bendadi/firstbase"
          className="font-medium text-foreground/80 transition-colors hover:text-primary"
        >
          https://github.com/Akshay-bendadi/firstbase
        </a>
      </div>
    </footer>
  );
}
