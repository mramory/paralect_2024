import Image from "next/image"
import s from "@/scss/components/Logo.module.scss"
import { Poppins } from "next/font/google"

const poppins = Poppins({subsets: ["latin"], weight: "600"})

export const Logo = () => {
    return(
        <div className={s.container}>
            <Image src="/images/logo.svg" alt="logo" width={32} height={32} />
            <p className={poppins.className}>ArrowFlicks</p>
        </div>
    )
}