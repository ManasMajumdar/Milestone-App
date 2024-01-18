import React from 'react';
import './ErrorBoundary.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.log(error, info);
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      return (
        <div className="misc-wrapper">
          <p className="mb-1 mt-3 fw-bold h2">Something went wrong!</p>
          <p className="mb-4 mx-2">Please try again later. 🙂</p>
          <a className="btn btn-primary rounded-pill" href="/login">
            Back
          </a>
        </div>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
