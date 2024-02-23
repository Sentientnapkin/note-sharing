import React from 'react';

export default function AuthErrorMessage({message}: {message: string}) {
  return (
    <div>
      <p>Error:
        <span> {message}</span>
      </p>
    </div>
  )
}
