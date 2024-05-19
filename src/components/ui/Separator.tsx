import s from "@/scss/components/ui/Separator.module.scss"

export const Sepearator = ({className}: {className?: string}) => {
    return(
        <div className={className ? s.separator + " " + className : s.separator} />
    )
}