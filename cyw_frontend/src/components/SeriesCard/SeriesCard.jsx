
import { useNavigate } from 'react-router-dom';
import styles from './SeriesCard.module.scss'

function SeriesCard(props) {
    const { series } = props;

    const navigate = useNavigate();

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
            <button 
                onClick={() => navigate(`/series/${series.slug}`)}
                className={styles['view-btn']}>
                View Cars
            </button>
        </div>
    )
}

export default SeriesCard