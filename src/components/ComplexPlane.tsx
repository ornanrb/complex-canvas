import Plot from "react-plotly.js";
import type { C } from "@/lib/complex";
import { formatC } from "@/lib/complex";
import { useMemo } from "react";

interface Props {
  a: C;
  b: C;
  result: C;
}

const point = (name: string, c: C, color: string) => {
  const label = `${name} = ${formatC(c)}`;
  return {
    x: [0, c.re],
    y: [0, c.im],
    mode: "text+lines+markers" as const,
    type: "scatter" as const,
    name: label,
    line: { color, width: 3 },
    marker: { color, size: [0, 12], symbol: "circle" as const },
    text: ["", `  ${name}(${c.re}, ${c.im})`],
    textposition: "top right" as const,
    textfont: { size: 13, color },
    hovertemplate: `<b>${name}</b><br>Re: %{x}<br>Im: %{y}<extra></extra>`,
  };
};

export const ComplexPlane = ({ a, b, result }: Props) => {
  const data = useMemo(
    () => [
      point("A", a, "hsl(250, 75%, 55%)"),
      point("B", b, "hsl(190, 90%, 45%)"),
      point("R", result, "hsl(160, 75%, 40%)"),
    ],
    [a, b, result]
  );

  const all = [a, b, result];
  const maxAbs = Math.max(2, ...all.flatMap((c) => [Math.abs(c.re), Math.abs(c.im)])) * 1.3;

  return (
    <Plot
      data={data}
      layout={{
        autosize: true,
        height: 460,
        margin: { l: 50, r: 20, t: 20, b: 50 },
        showlegend: true,
        legend: { orientation: "h", y: -0.15, font: { size: 12 } },
        paper_bgcolor: "rgba(0,0,0,0)",
        plot_bgcolor: "rgba(255,255,255,0.4)",
        xaxis: {
          title: { text: "Re (eje real)" },
          zeroline: true,
          zerolinecolor: "hsl(230, 20%, 60%)",
          zerolinewidth: 2,
          gridcolor: "hsl(220, 20%, 88%)",
          range: [-maxAbs, maxAbs],
          scaleanchor: "y",
        },
        yaxis: {
          title: { text: "Im (eje imaginario)" },
          zeroline: true,
          zerolinecolor: "hsl(230, 20%, 60%)",
          zerolinewidth: 2,
          gridcolor: "hsl(220, 20%, 88%)",
          range: [-maxAbs, maxAbs],
        },
        transition: { duration: 500, easing: "cubic-in-out" },
      }}
      config={{ displayModeBar: false, responsive: true }}
      useResizeHandler
      style={{ width: "100%" }}
    />
  );
};
