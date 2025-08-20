import { Button } from "@/components/ui/button";


interface Props {
error?: Error;
}


export const FallbackUI: React.FC<Props> = ({ error }) => {
return (
<div className="flex flex-col items-center justify-center h-full text-center p-6">
<h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
<p className="text-sm text-gray-600 mb-4">{error?.message ?? "An unexpected error occurred."}</p>
<Button onClick={() => window.location.reload()}>Reload</Button>
</div>
);
};