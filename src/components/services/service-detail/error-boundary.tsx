"use client";

import { Component } from "react";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // You can also log the error to an error reporting service
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      // You can render any fallback UI
      return (
        <div className="p-6 bg-red-900/20 border border-red-500/30 rounded-lg">
          <h3 className="text-lg font-medium text-white mb-2">
            Oops! Something went wrong.
          </h3>
          <p className="text-gray-300">
            We encountered an error loading this component. Please try
            refreshing the page.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}
