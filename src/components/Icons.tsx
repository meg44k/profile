import {useTheme} from "next-themes";
import Image from 'next/image'
import { useState, useEffect } from "react";

type IconProps = {
    width?: number,
    height?: number,
}

export const GithubIcon = ({width=50, height=50}: IconProps) => {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
            setMounted(true);
        }, []);
    if (!mounted) {
    return null; 
    }
    return(
        <div>
            {resolvedTheme === "dark" ? (
                <Image src="/github-mark-white.png" alt="xのロゴ" width={width} height={height}/>
            ) : (
               <Image src="/github-mark-black.png" alt="xのロゴ" width={width} height={height}/>
            )}
        </div>
    )
}

export const XIcon = ({width=50, height=50}: IconProps) => {
    const { resolvedTheme } = useTheme();
    return(
        <div>
            {resolvedTheme === "dark" ? (
                <Image src="/x-logo-white.png" alt="xのロゴ" width={width} height={height}/>
            ) : (
               <Image src="/x-logo-black.png" alt="xのロゴ" width={width} height={height}/>
            )}
        </div>
    )
}