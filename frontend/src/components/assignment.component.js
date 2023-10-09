import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
export default function Assignment() {
    const { id } = useParams();
    useEffect(() => {
        async function getAssignment() {

        }
        getAssignment();
    }, []);
    return (
        <p>assignment</p>
    );
}