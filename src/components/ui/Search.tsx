import { Input } from "@mantine/core";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import s from "@/scss/components/ui/Search.module.scss"
import { useForm } from "react-hook-form";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

interface SearchProps {
  onSubmit: () => void
}

export const Search = ({}: SearchProps) => {
  const searchParams = useSearchParams()
  const {push} = useRouter()
  const pathname = usePathname()

  const {
    register,
    handleSubmit,
    watch
  } = useForm<{search: string}>({
    defaultValues: {
      search: searchParams.get("search") || ""
    }
  })

  const watchedSearchValue = watch("search")

  useEffect(() => {
    if(watchedSearchValue === ""){
      const params = new URLSearchParams(searchParams);
      params.delete("search")
      push(`${pathname}?${params}`);
    }
  }, [watchedSearchValue === ""])

  const onSubmit = (data: {search: string}) => {
    const params = new URLSearchParams(searchParams);
    params.delete("search")
    params.append("search", data.search)
    params.delete("page")
    params.append("page", "1")
    push(`${pathname}?${params}`);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.input}>
    <Input
      {...register("search")}
      radius="md"
      placeholder="Search movie title"
      rightSectionPointerEvents="all"
      leftSection={
        <Image src="/icons/search.svg" width={16} height={16} alt="search" />
      }
      rightSection={
        <Button type="submit" size="S">
          Search
        </Button>
      }
      rightSectionWidth={100}
    />
    </form>
  );
};
