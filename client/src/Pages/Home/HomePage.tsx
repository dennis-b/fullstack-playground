import React from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

export const HomePage = () => {
    const navigate = useNavigate()
    const goToUser = () => navigate('/user')
    return (
        <div>
            Home
            <Button onClick={goToUser}>go to user page</Button>
        </div>
    );
};
