import styles from './Accordion.module.css'
import {useId} from 'react'

export type AccordionProps = {
    title: string;
    description: string;
}

export const Accordion = ({
    title,
    description,
}: AccordionProps) => {
    const uuid = useId()
    return(
        <div>
            <input type="checkbox" id={uuid} className={styles.accordionToggle}></input>
            <label htmlFor={uuid} className={styles.title}>
                {title}
            </label>
            <div className={styles.accordionWrapper}>
                <p className={styles.description}>
                    {description}
                </p>
            </div>
        </div>
    )
}