"use client";

import {
  Bar,
  BarChart,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  {
    name: "Jan",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Feb",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Mar",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Apr",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "May",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Jun",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Jul",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Aug",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Sep",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Oct",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Nov",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Dec",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
];

const burn = [
  { name: "Jan", total: 5000 },
  { name: "Feb", total: 4500 },
  { name: "Mar", total: 4000 },
  { name: "Apr", total: 3500 },
  { name: "May", total: 3000 },
  { name: "Jun", total: 2500 },
  { name: "Jul", total: 2000 },
  { name: "Aug", total: 1500 },
  { name: "Sep", total: 1000 },
  { name: "Oct", total: 500 },
  { name: "Nov", total: 400 },
  { name: "Dec", total: 300 },
];

export function Overview({ type }: { type: "BURN" | "FLOW" }) {
  return (
    <ResponsiveContainer width="100%" height={150}>
      <BarChart data={type === "FLOW" ? data : burn}>
        <Bar
          dataKey="total"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
