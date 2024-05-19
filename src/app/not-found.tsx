import { Logo } from "@/components/Logo"
import { Button } from "@/components/ui/Button"
import s from "@/scss/pages/NotFound.module.scss"
import Image from "next/image"
import Link from "next/link"

const NotFound = () => {
    return(
        <main className={s.container}>
            <div className={s.logo}><Logo /></div>
            <div className={s.content}>
                <Image src="/images/404.png" width={656} height={196} alt="Not Found" />
                <div className={s.info}>
                    <p>We can’t find the page you are looking for</p>
                    <Button><Link href="/">Go Home</Link></Button>
                </div>
            </div>
        </main>
    )
}

export default NotFound