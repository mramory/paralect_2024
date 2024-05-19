"use client"

import { Logo } from "@/components/Logo"
import Link from "next/link"
import s from "@/scss/components/Sidebar.module.scss"
import { usePathname } from "next/navigation"

export const Sidebar = () => {
    const pathname = usePathname()
    const firstPath = pathname.split("/")[1]

    return(
        <aside className={s.container}>
            <Logo />
            <nav className={s.links}>
                <Link href="/" className={(pathname === "/" || firstPath === "movies") ? s.active : ""}>Movies</Link>
                <Link href="/rated" className={pathname.includes("/rated") ? s.active : ""}>Rated movies</Link>
            </nav>
        </aside>
    )
}