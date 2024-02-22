import React from 'react';

export default function AuthErrorMessage({message}: {message: string}) {
  return (
    <div>
      <h1>Error:
        <span>{message}</span>
      </h1>
    </div>
  )
}
