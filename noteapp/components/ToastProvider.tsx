"use client"
import React from 'react';

import { ToastContainer, toast } from 'react-toastify';

export  function ToastProvider(){

  return (
    <div>
      <ToastContainer 
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
      />
    </div>
  );
}