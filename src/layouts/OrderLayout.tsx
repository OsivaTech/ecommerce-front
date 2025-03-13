import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function OrderLayout({ children }: LayoutProps) {
  return (
    <div>
      <header style={{ background: "#008080", color: "#fff", padding: "10px" }}>
        <h1>Detalhe do Pedido</h1>
      </header>
      <main>{children}</main>
    </div>
  );
}
