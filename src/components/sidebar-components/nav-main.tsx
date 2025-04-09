
import { ChevronRight, type LucideIcon } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { hasPermission } from "@/utils/permission";

export function NavMain({
  items,
}: {
  items: {
    title: string
    url?: string
    icon?: LucideIcon
    isActive?: boolean
    permissions?: string[]
    items?: {
      title: string
      url: string,
      permissions?: string[]
    }[]
  }[]
}) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleNavigate = (url?: string) => {
    if (url) {
      navigate(url);
    }
  };
  return (
    <SidebarGroup>
      {/* <SidebarGroupLabel>Platform</SidebarGroupLabel> */}
      <SidebarMenu>
        {items.map((item) => {
          const isParent = item.items && item.items.length > 0;
          const isHasPermissionSub = item.items?.some((subItem) => subItem.permissions ? hasPermission(subItem.permissions) : true);
          const isHasPermission = item.permissions ? hasPermission(item.permissions) : true;

          if ((isParent && !isHasPermissionSub) || (!isParent &&!isHasPermission)) return null;

          return (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={item.isActive}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={item.title} onClick={() => handleNavigate(item.url)}>
                    {item.icon && <item.icon />}
                    <span>{t(item.title)}</span>
                    {item.items && (
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    )}
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                {item.items && (
                  <CollapsibleContent>
                    <SidebarMenuSub>
                    {item.items?.map((subItem) => {
                      const isHasChildPermission = subItem.permissions ? hasPermission(subItem.permissions) : true;
                      if (!isHasChildPermission) return null;
                      return (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton className="cursor-pointer" asChild onClick={() => handleNavigate(subItem.url)}>
                            <span>{t(subItem.title)}</span>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      )
                    })}
                  </SidebarMenuSub>
                </CollapsibleContent>
              )}
              </SidebarMenuItem>
            </Collapsible>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
