"use client";

import { NumberInput } from "@/components/ui/NumberInput";
import { Select } from "@/components/ui/Select";
import s from "@/scss/components/Filters.module.scss";
import { GenreType } from "@/types/movies";
import { ComboboxData } from "@mantine/core";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {useDebouncedCallback} from "@/hooks/useDebounce"
import { sort, releaseDates } from "@/constants/filter";
import { Button } from "@/components/ui/Button";
import { MultiSelect } from "@/components/ui/MultiSelect";

interface FiltersProps {
  genres: Array<GenreType>;
}

export const Filters = ({ genres }: FiltersProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { push } = useRouter();
  
  const changeGenre = (value: string[] | null) => {
    const params = new URLSearchParams(searchParams);
    params.delete("with_genres");
    if(value){
      for (const genre of value){
        params.append("with_genres", genre);
      }
    }
    push(`${pathname}?${params}`, {scroll: false});
  };

  const changeReleaseDate = (value: string | null) => {
    const params = new URLSearchParams(searchParams);
    params.delete("primary_release_year");
    if(value){
      params.append("primary_release_year", value);
    }
    push(`${pathname}?${params}`, {scroll: false});
  }

  const changeFrom = (value: string | number) => {
    const params = new URLSearchParams(searchParams);
    params.delete("vote_average.gte");
    if(typeof value === "number"){
      params.append("vote_average.gte", value.toString());
    }
    push(`${pathname}?${params}`, {scroll: false});
  }
  const debouncedChangeFrom = useDebouncedCallback(changeFrom, 200)

  const changeTo = (value: string | number) => {
    const params = new URLSearchParams(searchParams);
    params.delete("vote_average.lte");
    if(typeof value === "number"){
      params.append("vote_average.lte", value.toString());
    }
    push(`${pathname}?${params}`, {scroll: false});
  }
  const debouncedChangeTo = useDebouncedCallback(changeTo, 200)

  const changeSort = (value: string | null) => {
    const params = new URLSearchParams(searchParams);
    params.delete("sort_by");
    if(value){
      params.append("sort_by", value.toString());
    }
    push(`${pathname}?${params}`, {scroll: false});
  }

  const resetFilters = () => {
    const params = new URLSearchParams(searchParams);
    for (const key of Array.from(params.keys())){
      if(key === "page") continue
      params.delete(key)
    }
    push(`${pathname}?${params}`, {scroll: false});
  }

  return (
    <search className={s.wrapper}>
      <div className={s.container}>
        <MultiSelect
          value={searchParams.getAll("with_genres")}
          onChange={changeGenre}
          data={
            genres?.map((el) => {
              return { value: el.id.toString(), label: el.name };
            }) as unknown as ComboboxData
          }
          placeholder="Select genre"
          label="Genres"
        />
        <Select
          value={searchParams.get("primary_release_year")}
          onChange={changeReleaseDate}
          data={releaseDates}
          placeholder="Select release year"
          label="Release year"
        />
        <div className={s.number_inputs}>
          <NumberInput value={searchParams.get("vote_average.gte")} onChange={debouncedChangeFrom} label="Raitings" placeholder="From" />
          <NumberInput value={searchParams.get("vote_average.lte")} onChange={debouncedChangeTo} label="" placeholder="To" />
        </div>
        <Button onClick={() => resetFilters()} color={searchParams.size ? "accent" : "grey"} variant="text" fontWeight="500" className={s.reset_btn}>Reset filters</Button>
      </div>
      <Select
        value={searchParams.get("sort_by") || "popularity.desc"}
        onChange={changeSort}
        data={sort}
        className={s.sort_by}
        label="Sort by"
      />
    </search>
  );
};
