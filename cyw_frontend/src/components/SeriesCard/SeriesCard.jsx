
import styles from './SeriesCard.module.scss'

function SeriesCard(props) {
    const { series } = props;

    return (
        <div className={styles['series-card']}>
            <div className={styles['info-cont']}>
                <h3>{series.title}</h3>
                <div className={styles['series-info']}>
                    <p>{series.year}</p>
                    <p>&#x2022;</p>
                    <p>{series.number_of_cars} cars</p>
                </div>
            </div>
            <button className={styles['view-btn']}>
                View Cars
            </button>
        </div>
    )
}

export default SeriesCard