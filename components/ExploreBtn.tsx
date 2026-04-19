'use client';

import Link from "next/link";
import Image from "next/image";

const ExploreBtn = () => {
    return (
        <div className="flex justify-center mt-10">
            <Link 
                href="#events" 
                className="flex items-center gap-2 bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-white/90 transition-all active:scale-95 shadow-lg shadow-white/5"
            >
                Explore Events
                <Image src="/icons/arrow-down.svg" alt="arrow-down" width={20} height={20} className="animate-bounce" />
            </Link>
        </div>
    )
}

export default ExploreBtn