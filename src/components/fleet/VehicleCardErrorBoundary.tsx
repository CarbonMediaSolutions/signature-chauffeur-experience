import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
  vehicleName?: string;
}

interface State {
  hasError: boolean;
}

export class VehicleCardErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error(`VehicleCard render error (${this.props.vehicleName || "unknown"}):`, error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="aspect-[4/3] bg-muted rounded-sm flex items-center justify-center">
          <p className="text-sm text-muted-foreground">Unable to display vehicle</p>
        </div>
      );
    }
    return this.props.children;
  }
}
