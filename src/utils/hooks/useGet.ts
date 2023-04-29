import { useStorage } from "../storage/storage";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { zapros } from "../axios";
export interface AllData {
  number: number;
  name: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  englishName: string;
}

export interface AyahsData{
  number : number,
  text : string,
  numberInSurah : number,
  juz : number,
  page : number,
  ruku : number,
  hizbQuarter : boolean
}

export const useGetAll = (key: [string], options: object = {}) => {
  return useQuery(
    key,
    () => zapros.get("/surah").then((data) => <AllData[]>data.data.data),
    options
  );
};

export const useGetForId = (
  key: [string, number],
  id: string | number,
  options: object = {}
) => {
  return useQuery(
    key,
    () => zapros.get(`/surah/${id}`).then((data) => data),
    options
  );
};

export const useGetlang = (
  key: [string , string | number],
  id: number | string,
  options: object = {}
) => {
  const wrote = useStorage((state) => state.wrote);
  return useQuery(
    key,
    () => zapros.get(`/surah/${id}/${wrote}`).then((data) => <AyahsData[]>data.data?.data?.ayahs),
    options
  );
};
