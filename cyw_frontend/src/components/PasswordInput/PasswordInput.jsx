
import { useState } from "react";
import styles from './PasswordInput.module.scss';


function PasswordInput(props) {
    const { name, handleChange, formDataField, placeholder } = props;

    const [isHidden, setIsHidden] = useState(true);

    return (
        <div className={styles["form-field"]}>
            <i className="fa-solid fa-lock"></i>
            <input
                type={isHidden ? 'password' : 'text'}
                name={name}
                className={styles["form-input"]}
                value={formDataField}
                onChange={handleChange}
                placeholder={placeholder}
                required
            />

            <i
                onClick={() => { setIsHidden(!isHidden) }}
                className={`fa-solid ${styles.eye} ${isHidden ?
                    'fa-eye' :
                    'fa-eye-slash'
                    }`}
            />
        </div>
    )
}

export default PasswordInput;