// src/components/TestDjangoConnection.tsx
import React, { useState } from "react";

const TestDjangoConnection: React.FC = () => {
  const [result, setResult] = useState<string>("");

  const testConnection = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/health/");
      if (response.ok) {
        setResult("✅ Django backend is connected!");
      } else {
        setResult("❌ Django backend responded with error");
      }
    } catch (error) {
      setResult("❌ Cannot connect to Django backend");
    }
  };

  return (
    <div className="p-4 border rounded-lg">
      <button
        onClick={testConnection}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Test Django Connection
      </button>
      <div className="mt-2">{result}</div>
    </div>
  );
};
