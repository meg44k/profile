"use client"
import {useState, useEffect, useRef} from 'react'

const CHARS = {
    en: "abcdefghijklnopqrstuvxyz",
    ja: "あいうえおかきくけこさしすせそたちつてとなにぬねのアイウエオカキクケコサシスセソ一二三四五六七八九十百千万亜唖娃阿哀愛挨逢葵茜穐悪握渥旭葦芦鯵梓圧斡扱宛姐虻飴絢綾鮎或粟"
};

export type ScrambleProps = {
    initialText: string,
    hoverText: string,
    type: "en" | "ja",
    active?: boolean
}

export const Scramble = ({
    initialText,
    hoverText,
    type,
    active
}: ScrambleProps) => {
    const [text, setText] = useState(initialText)
    const intervalRef = useRef<NodeJS.Timeout | null>(null);;

   const playScramble = (targetText: string) => {
    let iteration = 0;
    const chars = CHARS[type as keyof typeof CHARS];

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setText(() => 
        targetText
          .split("")
          .map((letter, index) => {
            if (index < iteration) return targetText[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= targetText.length) { 
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
      
      iteration += 1 / 2;
    }, 60);
  };
  useEffect(() => {
    if (active === undefined) return;

    if(active) {
        playScramble(hoverText);
    } else {
        playScramble(initialText);
    }

    return () => {
        if(intervalRef.current) clearInterval(intervalRef.current)
    };
  },[active])
  return(
    <span>
      {text}
    </span>
  );
} 