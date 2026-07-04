import { Component, ErrorInfo, ReactNode } from "react";
import {shouldSuppressError} from "../utils/errorFiltering";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    if (shouldSuppressError(error?.message)) {
      return { hasError: false };
    }
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error in application:", error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div 
          style={{
            backgroundColor: "#080808",
            color: "#f0ede8",
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            padding: "20px",
            textAlign: "center"
          }}
          className="error-boundary-container"
        >
          <h1 
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 300,
              letterSpacing: "0.05em",
              marginBottom: "32px",
              lineHeight: 1.3
            }}
          >
            Something went wrong. Please refresh the page.
          </h1>
          <button
            onClick={this.handleReload}
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: "0.65rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#c9a84c",
              border: "1px solid #c9a84c",
              padding: "16px 48px",
              background: "transparent",
              cursor: "pointer",
              transition: "all 0.4s ease"
            }}
            className="hover:bg-[#c9a84c] hover:text-[#080808]"
          >
            Reload
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
