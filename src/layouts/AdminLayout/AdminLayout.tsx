import * as React from "react";

import {
  AudioWaveform,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
} from "lucide-react";

import { NavMain } from "@/components/sidebar-components/nav-main";
// import { NavProjects } from "@/components/sidebar-components/nav-projects";
import { NavUser } from "@/components/sidebar-components/nav-user";
import { TeamSwitcher } from "@/components/sidebar-components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarRail,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import TopSidebarHeader from "@/components/sidebar-components/sidebar-header";
import { MENUS_NAVBAR } from "@/constants/menus";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "https://github.com/shadcn.png",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
 
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

function AdminLayout({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <div>
      <SidebarProvider>
        <Sidebar collapsible="icon" {...props} className="sidebar-height">
          <SidebarHeader>
            <TeamSwitcher teams={data.teams} />
          </SidebarHeader>
          <SidebarContent>
            <NavMain items={MENUS_NAVBAR} />
            {/* <NavProjects projects={data.projects} /> */}
          </SidebarContent>
          <SidebarFooter>
            <NavUser />
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>
        <SidebarInset>
          <TopSidebarHeader />
          {/* Main content */}
          <div className="flex flex-1 flex-col gap-4 p-4">
              <Outlet />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}

export default AdminLayout;
