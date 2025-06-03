"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";

export function Tabs(props: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-2", props.className)}
      {...props}
    />
  );
}

export function TabsList(
  props: React.ComponentProps<typeof TabsPrimitive.List>,
) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "relative flex w-full border-b border-gray-200",
        props.className,
      )}
      {...props}
    />
  );
}

export function TabsTrigger(
  props: React.ComponentProps<typeof TabsPrimitive.Trigger>,
) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "relative pb-2 text-sm font-normal transition-colors",
        "text-gray-500",
        "hover:text-gray-700",
        "border-0",

        "data-[state=active]:!text-gray-900",
        "data-[state=active]:!font-semibold",
        "flex-1",

        props.className,
      )}
      {...props}
    />
  );
}

export function TabsContent(
  props: React.ComponentProps<typeof TabsPrimitive.Content>,
) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", props.className)}
      {...props}
    />
  );
}
