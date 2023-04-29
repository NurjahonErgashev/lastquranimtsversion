import create from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
interface Store {
  author: string;
  wrote: string;
  setWrote : (str : string)=>void
  setAuthor: (by: string) => void;
  audio: number;
  setAudio: (a: number) => void;
  plusAudio: () => void;
  status: {
    number?: number;
    status?: "play" | "pause";
  };
  setStatus: (num: number, str: "play" | "pause") => void;
  context : string,
  setContext : (str:string) => void
}

export const useStorage = create<Store>()(
  persist(
    (set) => ({
      author: "ar.alafasy",
      setAuthor: (by) => set(() => ({ author: by })),
      audio: 0,
      setAudio: (a) => set(() => ({ audio: a })),
      plusAudio: () => set((state) => ({ audio: state.audio + 1 })),
      status: {},
      setStatus: (num: number, str: "play" | "pause") =>
        set(() => ({
          status: {
            number: num,
            status: str,
          },
        })),
      wrote: "ar.alafasy",
      setWrote: (str : string) => set(() => ({ wrote: str })),
      context : 'Toshkent',
      setContext : (str : string) => set(() => ({ context : str })),
    }),
    { name: "set", storage: createJSONStorage(() => sessionStorage) }
  )
);
