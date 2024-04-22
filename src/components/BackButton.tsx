import React from 'react';
import Button from "@mui/material/Button";

export default function BackButton() {
  return (
    <div>
      <Button onClick={() => window.history.back()}>Back</Button>
    </div>
  );
}