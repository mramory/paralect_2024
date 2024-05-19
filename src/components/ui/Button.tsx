import s from "@/scss/components/ui/Button.module.scss"
import clsx from "clsx"
import { ButtonHTMLAttributes } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode,
    size?: "S" | "M",
    variant?: "default" | "text",
    fontWeight?: "500" | "600" | "700",
    color?: "accent" | "grey"
}

export const Button = ({children, size = "M", variant = "default", fontWeight = "600", color="accent", ...props}: ButtonProps) => {
    return(
        <button {...props} className={clsx(s.btn, s[size], s[variant], s["w"+fontWeight], s[color], props.className)}>{children}</button>
    )
}