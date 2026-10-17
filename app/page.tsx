import { SubnetCalculatorApp } from "@/components/subnet-calculator/SubnetCalculatorApp";

export default function Home() {
  return (
    <main className="calculator-page">
      <div className="calculator-container">
        <header className="calculator-header">
          <h1>
            サブネットマスク電卓
          </h1>
          <p>
            IPアドレスとサブネットマスクを入力すると、ネットワーク情報を即座に計算します。
          </p>
        </header>
        <SubnetCalculatorApp />
      </div>
    </main>
  );
}
