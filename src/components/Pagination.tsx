"use client"

import { Pagination as PG } from "@mantine/core"
import s from "@/scss/components/Pagination.module.scss"
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

interface PaginationProps {
    align?: "start" | "center" | "end",
    total: number,
    defaultPage: number
}

export const Pagination = ({align, total, defaultPage}: PaginationProps) => {
    const pathname = usePathname();
    const searchParams = useSearchParams()
    const { push } = useRouter();

    const changePage = (page: number) => {
        const params = new URLSearchParams(searchParams);
        params.delete('page');
        params.append('page', page.toString());
        push(`${pathname}?${params}`);
    }

    return(
        <PG onChange={changePage} defaultValue={Number(searchParams.get('page')) || defaultPage} classNames={{control: s.control, root: `${align ? s.root + " " + align : s.root}`}} total={total > 500 ? 500 : total} />
    )
}