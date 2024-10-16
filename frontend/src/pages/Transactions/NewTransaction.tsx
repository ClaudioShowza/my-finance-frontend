// src/pages/Transactions/NewTransaction.tsx

import React, { useState } from 'react';
import {
  Typography,
  Box,
  CircularProgress,
  Snackbar,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import TransactionForm from '../../components/TransactionForm';
import { TransactionFormInputs } from '../../types';
import { SubmitHandler } from 'react-hook-form';

const NewTransaction: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit: SubmitHandler<TransactionFormInputs> = (data) => {
    setLoading(true);
    setErrorMessage(null);

    try {
      // Recuperar transações existentes do localStorage
      const existingTransactions = JSON.parse(
        localStorage.getItem('transactions') || '[]'
      );

      // Adicionar nova transação
      const updatedTransactions = [
        ...existingTransactions,
        { id: Date.now(), ...data },
      ];
      localStorage.setItem('transactions', JSON.stringify(updatedTransactions));

      setSuccessMessage('Transação adicionada com sucesso!');
      setLoading(false);
      navigate('/transactions');
    } catch (error) {
      setErrorMessage('Erro ao adicionar transação.');
      setLoading(false);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Nova Transação
      </Typography>
      {loading && (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      )}
      {!loading && <TransactionForm onSubmit={handleSubmit} mode="add" />}
      {/* Notificações de Sucesso */}
      <Snackbar
        open={!!successMessage}
        autoHideDuration={6000}
        onClose={() => setSuccessMessage(null)}
      >
        <Alert
          onClose={() => setSuccessMessage(null)}
          severity="success"
          sx={{ width: '100%' }}
        >
          {successMessage}
        </Alert>
      </Snackbar>
      {/* Notificações de Erro */}
      <Snackbar
        open={!!errorMessage}
        autoHideDuration={6000}
        onClose={() => setErrorMessage(null)}
      >
        <Alert
          onClose={() => setErrorMessage(null)}
          severity="error"
          sx={{ width: '100%' }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default NewTransaction;
