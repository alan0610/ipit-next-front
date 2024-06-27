"use client"
import { useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const DepositPage = () => {
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const urlDeposit = `${process.env.apiUrl}/users/balance`;
  const loginPage = '/Login';

  const handleDeposit = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        window.location.href = loginPage;
        return;
      }

      const decodedToken = jwtDecode(token);
      const userId = decodedToken._id;

      const response = await fetch(urlDeposit, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: userId,
          amount: parseFloat(amount),
        }),
      });

      if (!response.ok) {
        throw new Error('Error al realizar el depósito');
      }

      const data = await response.json();

      if (data.success) {
        alert('Depósito realizado con éxito');
        window.location.href = '/Users';
      } else {
        setMessage('Error al realizar el depósito');
      }
    } catch (error) {
      console.error('Error al realizar el depósito:', error);
      setMessage('Error al realizar el depósito');
    }
  };

  return (
    <main className="flex justify-center">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Depositar Dinero</h2>
        <input
          type="number"
          className="w-full p-2 mb-4 border border-gray-300 rounded text-black"
          placeholder="Monto a depositar"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button
          onClick={handleDeposit}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 hover:shadow-md transition duration-200 w-full"
        >
          Depositar
        </button>
        {message && (
          <p className="mt-4 text-center text-gray-700">{message}</p>
        )}
      </div>
    </main>
  );
};

export default DepositPage;
