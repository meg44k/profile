import Image from "next/image";

import styles from './ProductCard.module.css'

import { GithubIcon } from "./Icons";

export type ProductCardProps = {
    title: string;
    description: string;
    githubUrl: string;
    imagePath: string;
    detailUrl?: string;
}

export const ProductCard = ({
    title,
    description,
    githubUrl,
    imagePath,
    detailUrl
}: ProductCardProps) => {
    return (
        <div className={styles.wrapperCard}>
            <h2 className={styles.title}><a href={detailUrl} target="_blank" rel="noopener noreferrer">{title}</a></h2>
            <Image className={styles.thumbnail} src={imagePath} alt={title} width={1000} height={1000}/>
            <div className={styles.githubWrapper}>
                <a href={githubUrl} className={styles.githubUrlWrapper} target="_blank" rel="noopener noreferrer">
                    <GithubIcon width={20} height={20}/>
                    <p className={styles.github}>Github</p>
                </a>
            </div>
            <p className={styles.description}>{description}</p>
        </div>
    )
}