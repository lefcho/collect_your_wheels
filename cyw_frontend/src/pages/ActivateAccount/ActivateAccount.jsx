import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api';
import { activateUrl } from '../../constants';

function ActivateAccount() {
    const [loading, setLoading] = useState(true);
    const { uid, token } = useParams();
    const navigate = useNavigate();

    const handleActivateAccount = async () => {
        try {
            await api.post(activateUrl, { uid, token });
            navigate("/login");
        } catch (err) {
            console.error("Activation error: ", err);
            alert("Activation failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handleActivateAccount();
    }, [uid, token]);

    return (
        <div>
            {loading ? (
                <p>Activating your account...</p>
            ) : (
                <p>There was an error please try again.</p>
            )}
        </div>
    );
}

export default ActivateAccount;
