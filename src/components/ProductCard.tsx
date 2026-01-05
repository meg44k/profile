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
            
                <h2 className={styles.title}>{title}</h2>
                <img className={styles.thumbnail} src={imagePath} alt={title} />
                <div className={styles.githubUrlWrapper}>
                    <a href={githubUrl} target="_blank" rel="noopener noreferrer"><GithubIcon className={styles.githubIcon}></GithubIcon></a>
                </div>
                <p className={styles.description}>{description}</p>
        </div>
    )
}