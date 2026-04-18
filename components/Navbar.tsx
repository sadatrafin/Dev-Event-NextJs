import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <header className="w-full border-b border-white/10 bg-background/50 backdrop-blur-md sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-2 lg:px-4 h-16 flex items-center justify-between">
        <Link href="/" className="logo">
          <Image src="/icons/logo.png" alt="logo" width={24} height={24} />

          <p className="font-bold text-xl tracking-tight">DevEvent</p>
        </Link>

        <ul className="flex items-center gap-8 text-sm font-medium text-white/70">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <Link href="/" className="hover:text-white transition-colors">Events</Link>
          <Link href="/" className="bg-primary/10 text-primary px-4 py-2 rounded-full hover:bg-primary/20 transition-all border border-primary/20">Create Event</Link>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
