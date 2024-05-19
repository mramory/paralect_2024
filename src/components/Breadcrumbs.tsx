"use client";

import { Anchor, Breadcrumbs as BC } from "@mantine/core";
import { usePathname, useSearchParams } from "next/navigation";
import s from "@/scss/components/Breadcrumbs.module.scss";

export const Breadcrumbs = () => {
  const paths = usePathname();
  const searchParams = useSearchParams();
  const pathNames = paths.split("/").filter((path) => path);
  
  return (
    <BC className={s.container}>
      {pathNames.map((link, index) => {
        let href = `/${pathNames
          .slice(0, index + 1)
          .join("/")}`;
        if(href === "/movies") href = "/"

        if(index === 0) {
          href = href+`?${searchParams.get("callback_params")?.toString().split("~").join("&")}`
        }
        else{
          href = href+`?callback_params=${searchParams.get("callback_params")}&slug=${searchParams.get("slug")}`
        }
        let itemLink =
          Number(link) >= 0
            ? searchParams.get("slug")
            : link[0].toUpperCase() + link.slice(1, link.length);
        return (
          <Anchor
            className={s.link}
            href={href}
            key={index}
          >
            {itemLink}
          </Anchor>
        );
      })}
    </BC>
  );
};
