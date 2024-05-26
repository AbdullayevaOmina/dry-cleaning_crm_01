import { PieChart } from "@mui/x-charts/PieChart";

export default function PieActiveArc({ data }: { data: any }) {
  return (
    <div className="mt-7">
      <PieChart
        series={[
          {
            data,
            highlightScope: { faded: "global", highlighted: "item" },
            faded: { innerRadius: 35, additionalRadius: -35, color: "gray" },
          },
        ]}
        height={450}
      />
    </div>
  );
}
