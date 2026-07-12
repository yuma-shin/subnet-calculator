import { SubnetCalculatorApp } from "@/components/subnet-calculator/SubnetCalculatorApp";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center bg-zinc-50 px-4 py-12 dark:bg-black sm:py-20">
      <div className="flex w-full max-w-2xl flex-col items-center gap-8">
        <header className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl dark:text-zinc-50">
            サブネットマスク電卓
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            IPアドレスとサブネットマスクを入力すると、ネットワーク情報を即座に計算します。
          </p>
        </header>
        <SubnetCalculatorApp />
      </div>
    </div>
  );
}
