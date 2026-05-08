import type { Op } from "@/lib/complex";
import { opLabel } from "@/lib/complex";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

interface Props {
  value: Op;
  onChange: (o: Op) => void;
}

export const OperationSelector = ({ value, onChange }: Props) => (
  <div className="space-y-2">
    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
      Selecciona operación
    </label>
    <Select value={value} onValueChange={(v) => onChange(v as Op)}>
      <SelectTrigger className="rounded-xl h-11">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {(Object.keys(opLabel) as Op[]).map((k) => (
          <SelectItem key={k} value={k}>{opLabel[k]}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);
