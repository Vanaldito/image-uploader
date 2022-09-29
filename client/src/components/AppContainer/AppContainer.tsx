import "./AppContainer.css";

interface AppContainerProps {
  children: React.ReactNode;
}

export default function AppContainer({ children }: AppContainerProps) {
  return (
    <div className="app-container">
      <main className="app">{children}</main>
    </div>
  );
}
