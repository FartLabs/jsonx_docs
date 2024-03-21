const from = [
  { name: [], title: "Overview" },
  {
    name: ["01_getting_started"],
    title: "Getting Started",
  },
  { name: ["01_getting_started", "01_install"], title: "Install" },
  { name: ["01_getting_started", "02_use"], title: "Use" },
  {
    name: ["99_view_on_github"],
    title: "View on GitHub",
    href: "https://github.com/FartLabs/jsonx",
  },
];

const to = [
  { name: [], title: "Overview" },
  {
    name: ["01_getting_started"],
    children: [
      { name: ["01_getting_started", "01_install"], title: "Install" },
      { name: ["01_getting_started", "02_use"], title: "Use" },
    ],
  },
  {
    name: ["99_view_on_github"],
    title: "View on GitHub",
    href: "https://github.com/FartLabs/jsonx",
  },
];
