"use client";

import Taskbar from "@/components/ui/Taskbar";
import Window from "@/components/ui/Window";
import Hello from "@/components/programs/hello.mdx";
import Rickroll from "@/components/programs/rickroll.mdx";
import { MDXEmbedProvider } from "mdx-embed";

export default function App() {
  return (
    <div>
      <Taskbar />
      <Window
        title="Welcome!"
        initialPosition={{ x: 250, y: 200 }}
        initialSize={{ x: 500, y: 500 }}
      >
        <MDXEmbedProvider>
          <Hello />
        </MDXEmbedProvider>
      </Window>
      <Window
        title="Ooh, what's this?"
        initialPosition={{ x: 800, y: 400 }}
        initialSize={{ x: 768, y: 480 }}
      >
        <MDXEmbedProvider>
          <Rickroll />
        </MDXEmbedProvider>
      </Window>
    </div>
  );
}
