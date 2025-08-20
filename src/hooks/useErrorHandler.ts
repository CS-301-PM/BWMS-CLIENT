import { useToast } from "@/hooks/useToast";
import { useCallback } from "react";


export const useErrorHandler = () => {
const { toast } = useToast();


return useCallback(
(error: unknown, context?: string) => {
console.error("Error in", context, error);
let message = "Unknown error";
if (error instanceof Error) message = error.message;
else if (typeof error === "string") message = error;


toast({
title: context ?? "Error",
description: message,
variant: "destructive",
});
},
[toast]
);
};