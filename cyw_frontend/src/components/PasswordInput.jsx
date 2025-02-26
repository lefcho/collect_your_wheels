import { useState } from "react";

function PasswordInput(props) {
    const { name, handleChange, formDataField, placeholder } = props;

    const [isHidden, setIsHidden] = useState(true);

    return (
        <div className="form-field password-field">
            <i className="fa-solid fa-lock"></i>
            <input
                type={isHidden ? 'password' : 'text'}
                name={name}
                className="form-input"
                value={formDataField}
                onChange={handleChange}
                placeholder={placeholder}
                required
            />

            <i
                onClick={() => { setIsHidden(!isHidden) }}
                className={`fa-solid ${isHidden ?
                        'fa-eye' :
                        'fa-eye-slash'
                    }`}
            />
        </div>
    )
}

export default PasswordInput;