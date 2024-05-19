import { Loader as L } from "@mantine/core"
import s from "@/scss/components/ui/Loader.module.scss"

export const Loader = () => {
    return(
        <div className={s.container}>
            <L color="violet" />
        </div>
    )
}