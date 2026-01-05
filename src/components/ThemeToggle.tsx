"use client"

import {useTheme} from "next-themes";
import { useEffect, useState } from "react";

import SunIcon from "../../public/Sun.svg"
import MoonIcon from "../../public/Moon.svg"

import styles from "./ThemeToggle.module.css"

export default function ThemeToggle() {
    const {setTheme, resolvedTheme} = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    const isDark = resolvedTheme === "dark";

    const toggleTheme = () => {
        setTheme(isDark ? "light" : "dark");
    };

    return (
        <button
            className={styles.button}
            onClick={toggleTheme}
            aria-label="テーマ切り替え"
        >
        {isDark ? (
        <SunIcon className={styles.icon} /> 
      ) : (
        <MoonIcon className={styles.icon} /> 
      )}
        </button>
    )
}