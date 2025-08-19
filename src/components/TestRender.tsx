// src/components/TestRender.tsx
"use client";

import React from "react";

export default function TestRender() {
  console.log("✅ TestRender component is rendering!");

  return (
    <div className="p-8 bg-green-100 border border-green-400">
      <h1 className="text-2xl font-bold text-green-800">
        ✅ React is Working!
      </h1>
      <p className="text-green-600">
        If you can see this, React is rendering correctly.
      </p>
      <p className="text-green-600">Timestamp: {new Date().toISOString()}</p>
    </div>
  );
}
