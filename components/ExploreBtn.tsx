'use client';

import Link from "next/link";
import Image from "next/image";

const ExploreBtn = () => {
    return (
        <div className="flex justify-center mt-10">
            <Link 
                href="#events" 
                className="group flex items-center gap-2.5 bg-white text-black px-8 py-3.5 rounded-full font-bold tracking-tight hover:bg-neutral-100 transition-all duration-300 active:scale-95 shadow-[0_8px_30px_rgba(255,255,255,0.05)] hover:shadow-[0_8px_30px_rgba(255,255,255,0.1)] border border-white/10"
            >
                Explore Events
                <Image 
                    src="/icons/arrow-down.svg" 
                    alt="arrow-down" 
                    width={18} 
                    height={18} 
                    className="animate-bounce brightness-0 opacity-70 group-hover:opacity-100 transition-opacity" 
                />
            </Link>
        </div>
    )
}

export default ExploreBtn