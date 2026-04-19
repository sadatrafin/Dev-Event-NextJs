import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <header className="w-full border-b border-white/10 bg-background/60 backdrop-blur-xl sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="#" className="flex items-center gap-2.5 group">
          <Image src="/icons/logo.png" alt="logo" width={24} height={24} />

          <p className="font-bold text-xl tracking-tight group-hover:text-primary transition-colors">DevEvent</p>
        </Link>

        <ul className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
          <li className="list-none"><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
          <li className="list-none"><Link href="#events" className="hover:text-white transition-colors">Events</Link></li>
          <li className="list-none"><Link href="#create-event" className="bg-primary/10 text-primary px-5 py-2 rounded-full hover:bg-primary/20 transition-all border border-primary/30 active:scale-95">Create Event</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
