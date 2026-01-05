import Image from "next/image";

import styles from './ProductCard.module.css'

import GithubIcon from "../../public/github-icon-lightmode.svg"

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
            <div className={styles.githubUrlWrapper}>
                <a href={githubUrl} target="_blank" rel="noopener noreferrer"><GithubIcon className={styles.githubIcon}></GithubIcon></a>
            </div>
            <p className={styles.description}>{description}</p>
        </div>
    )
}