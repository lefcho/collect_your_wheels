import { useState } from "react";

function PasswordInput(props) {
    const {name, handleChange, formDataField, placeholder} = props;

    const [isHidden, setIsHidden] = useState(true);

    return (
        <div className="form-field password-field">
            <input
                type={isHidden ? 'password' : 'text'}
                name={name}
                className="form-input"
                value={formDataField}
                onChange={handleChange}
                placeholder={placeholder}
                required
            />
            <button onClick={() => {setIsHidden(!isHidden)}}>
                <i className={`fa-solid ${isHidden ? 'fa-eye' : 'fa-eye-slash'}`}></i>
            </button>
        </div>
    )
}

export default PasswordInput;