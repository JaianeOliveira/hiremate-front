"use client";

import { CalendarIcon } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function formatDate(date: Date | null) {
  if (!date) return "";
  return date.toLocaleDateString("pt-BR");
}

function isValidDate(d: Date) {
  return d instanceof Date && !isNaN(d.getTime());
}

export interface DatePickerProps {
  id?: string;
  label: string;
  date: Date | null;
  onDateChange: (date: Date | null) => void;
  placeholder?: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

export function DatePicker({
  id = "date-picker",
  label,
  date,
  onDateChange,
  placeholder = "Select date",
  inputProps,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);
  const [month, setMonth] = React.useState<Date | null>(date);
  const [text, setText] = React.useState(formatDate(date));

  React.useEffect(() => {
    setText(formatDate(date));
    setMonth(date);
  }, [date]);

  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor={id} className="px-1">
        {label}
      </Label>
      <div className="relative flex items-center">
        <Input
          id={id}
          value={text}
          placeholder={placeholder}
          className="pr-10 bg-background"
          onChange={(e) => {
            setText(e.target.value);
            const parsed = new Date(e.target.value);
            if (isValidDate(parsed)) {
              onDateChange(parsed);
              setMonth(parsed);
            } else {
              onDateChange(null);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setOpen(true);
            }
          }}
          {...inputProps}
        />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              className="absolute right-2 size-6 top-1/2 -translate-y-1/2"
            >
              <CalendarIcon className="size-3.5" />
              <span className="sr-only">Toggle calendar</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="p-0 w-auto overflow-hidden"
            align="end"
            alignOffset={-8}
            sideOffset={10}
          >
            <Calendar
              mode="single"
              selected={date ?? undefined}
              month={month ?? undefined}
              captionLayout="dropdown"
              onMonthChange={setMonth as (date: Date) => void}
              onSelect={(d) => {
                onDateChange(d ?? null);
                setText(formatDate(d ?? null));
                setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
