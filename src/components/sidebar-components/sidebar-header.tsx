import React from "react";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";
import ModeToggle from "@/components/ThemToggle";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useMatches } from "react-router-dom";

// Define the type for our route handle
interface RouteHandle {
  crumb: string | (() => string);
}

const TopSidebarHeader = () => {
  const matches = useMatches();
  
  const generateBreadcrumbs = () => {
    const validMatches = matches.filter(match => match.handle && typeof match.handle === 'object' && 'crumb' in match.handle)
    return validMatches
      .map((match, index) => {
        const isLast = index === validMatches.length - 1;
        const handle = match.handle as RouteHandle;
        const crumb = typeof handle.crumb === 'function' ? handle.crumb() : handle.crumb;
        
        return (
          <React.Fragment key={match.id}>
            <BreadcrumbItem className="hidden md:block">
              {isLast ? (
                <BreadcrumbPage>{crumb}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={match.pathname}>{crumb}</BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {!isLast && <BreadcrumbSeparator className="hidden md:block" />}
          </React.Fragment>
        );
      });
  };

  return (
    <header>
      <div className="flex  px-4 h-12 md:h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 border-b border-border">
        <div className="flex h-full shrink-0 items-center gap-2  ">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              {generateBreadcrumbs().length > 0 && generateBreadcrumbs()}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <LanguageSwitcher />
        </div>
      </div>

      {/* <div className="px-4 py-4 md:py-6 flex flex-col border-b border-border">
      <div className="flex justify-between md:items-center gap-4 md:flex-row flex-col">
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            API Settings
          </h1>
        </div>
        <div className="relative md:max-w-xs w-full">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input type="search" placeholder="Search" className="pl-8" />
        </div>
      </div>
    </div> */}
    </header>
  );
};

export default TopSidebarHeader;
