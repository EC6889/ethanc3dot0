import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
          <div className="max-w-md w-full text-center border border-red-900/50 bg-red-950/20 p-8 rounded">
            <AlertTriangle size={48} className="text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-display font-bold text-white mb-2">System Error</h1>
            <p className="text-slate-400 mb-6">
              An unexpected error occurred. Please refresh the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-red-900/50 border border-red-700 text-red-200 font-mono text-sm uppercase tracking-wider hover:bg-red-900 transition-colors"
            >
              Reload_System
            </button>
            {this.state.error && (
              <div className="mt-6 text-left">
                <p className="text-[10px] font-mono text-slate-600 mb-2">ERROR_DETAILS:</p>
                <pre className="text-[10px] font-mono text-red-400 bg-slate-900/50 p-3 rounded overflow-x-auto">
                  {this.state.error.message}
                </pre>
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
