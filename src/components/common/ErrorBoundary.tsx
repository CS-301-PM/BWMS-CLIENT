import React from "react";
import { FallbackUI } from "@/components/common/FallbackUI";


interface ErrorBoundaryState {
hasError: boolean;
error?: Error;
}


export class ErrorBoundary extends React.Component<React.PropsWithChildren, ErrorBoundaryState> {
constructor(props: React.PropsWithChildren) {
super(props);
this.state = { hasError: false };
}


static getDerivedStateFromError(error: Error): ErrorBoundaryState {
return { hasError: true, error };
}


componentDidCatch(error: Error, info: React.ErrorInfo) {
console.error("ErrorBoundary caught:", error, info);
}


render() {
if (this.state.hasError) {
return <FallbackUI error={this.state.error} />;
}
return this.props.children;
}
}