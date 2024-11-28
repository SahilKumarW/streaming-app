// src/pages/AccessDenied.jsx
import React from "react";
import { useLocation, Link } from "react-router-dom";
import styled from "styled-components";

const AccessDenied = () => {
    const location = useLocation();
    const from = location.state?.from?.pathname || "/"; // Get the path from which the user was redirected

    return (
        <AccessDeniedContainer>
            <AccessDeniedHeading>Access Denied</AccessDeniedHeading>
            <AccessDeniedMessage>You do not have permission to access this page.</AccessDeniedMessage>
            <AccessDeniedBack>
                Go back to <StyledLink to="/home">Home</StyledLink>.
            </AccessDeniedBack>
        </AccessDeniedContainer>
    );
};

// Styled Components
const AccessDeniedContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f8f8f8;
  color: #333;
  text-align: center;
`;

const AccessDeniedHeading = styled.h1`
  font-size: 3rem;
  color: #e74c3c; /* Red color for emphasis */
  margin-bottom: 1rem;
`;

const AccessDeniedMessage = styled.p`
  font-size: 1.2rem;
  color: #555;
  margin-bottom: 1.5rem;
`;

const AccessDeniedBack = styled.p`
  font-size: 1.1rem;
  color: #007bff; /* Blue text */
`;

const StyledLink = styled(Link)`
  color: #007bff;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
    color: #0056b3;
  }
`;

export default AccessDenied;
