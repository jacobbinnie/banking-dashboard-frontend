import { Overview } from "./overview";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface ChartCardProps {
  title: string;
  total: number;
  type: "BURN" | "FLOW";
}

function ChartCard({ title, total, type }: ChartCardProps) {
  const formattedBalance = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "GBP",
  }).format(total);

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <p className="text-2xl font-bold">
          {type === "BURN" ? `${total.toFixed(1)} months` : formattedBalance}
        </p>
        <Overview type={type} />
      </CardHeader>
    </Card>
  );
}

export default ChartCard;
