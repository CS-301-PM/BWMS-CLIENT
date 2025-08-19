// src/components/DebugAuth.tsx
"use client";

import { useAuth } from "../../contexts/auth-context";

export default function DebugAuth() {
  const { user, loading, error } = useAuth();

  return (
    <div className="p-4 border rounded-lg bg-yellow-50">
      <h3 className="font-semibold mb-2">Auth Debug Info</h3>
      <pre className="text-xs">
        {JSON.stringify(
          {
            user: user ? { ...user, password: undefined } : null,
            loading,
            error,
            hasUser: !!user,
            timestamp: new Date().toISOString(),
          },
          null,
          2
        )}
      </pre>
    </div>
  );
}
