export const fetchDocumentation = async () => {
  // Updated documentation data
  return [
    {
      title: "App Idea Generator",
      description: "A tool to generate app ideas based on user inputs.",
      examples: `
        import AppIdeaGenerator from "@/components/AppIdeaGenerator";
        import { Card } from "@/components/ui/card";
        import { TooltipProvider } from "@/components/ui/tooltip";

        const Index = () => {
          return (
            <TooltipProvider>
              <div className="text-center">
                <Card className="p-6">
                  <AppIdeaGenerator />
                </Card>
              </div>
            </TooltipProvider>
          );
        };

        export default Index;
      `,
      notes: "This component allows users to specify various parameters to generate a detailed app idea prompt."
    },
    {
      title: "Documentation",
      description: "A section to view and search through the application's documentation.",
      examples: `
        import React, { useState, useEffect } from 'react';
        import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
        import { Card } from '@/components/ui/card';
        import { Input } from '@/components/ui/input';
        import { Button } from '@/components/ui/button';
        import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
        import { fetchDocumentation } from '@/utils/documentation';

        const Documentation = () => {
          const [searchTerm, setSearchTerm] = useState('');
          const [documentation, setDocumentation] = useState([]);
          const [filteredDocs, setFilteredDocs] = useState([]);

          useEffect(() => {
            const loadDocumentation = async () => {
              const docs = await fetchDocumentation();
              setDocumentation(docs);
              setFilteredDocs(docs);
            };

            loadDocumentation();
          }, []);

          useEffect(() => {
            const filtered = documentation.filter(doc =>
              doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
              doc.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredDocs(filtered);
          }, [searchTerm, documentation]);

          return (
            <div className="p-4 max-w-4xl mx-auto">
              <h1 className="text-3xl font-bold mb-6">Documentation</h1>
              <Input
                placeholder="Search documentation..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-4"
              />
              <Tabs>
                <TabsList className="mb-4">
                  {filteredDocs.map((doc, index) => (
                    <TabsTrigger key={index} value={doc.title}>
                      {doc.title}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {filteredDocs.map((doc, index) => (
                  <TabsContent key={index} value={doc.title}>
                    <Card className="p-6 mb-4">
                      <h2 className="text-2xl font-semibold mb-2">{doc.title}</h2>
                      <p className="mb-4">{doc.description}</p>
                      {doc.examples && (
                        <div className="mb-4">
                          <h3 className="text-xl font-semibold mb-2">Examples</h3>
                          <pre className="bg-gray-100 p-4 rounded">{doc.examples}</pre>
                        </div>
                      )}
                      {doc.notes && (
                        <Alert>
                          <AlertTitle>Note</AlertTitle>
                          <AlertDescription>{doc.notes}</AlertDescription>
                        </Alert>
                      )}
                    </Card>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          );
        };

        export default Documentation;
      `,
      notes: "This component fetches and displays the documentation data, allowing users to search through it."
    },
    {
      title: "Navigation",
      description: "Components for navigating through the application.",
      examples: `
        import { Button } from "@/components/ui/button";
        import {
          DropdownMenu,
          DropdownMenuContent,
          DropdownMenuItem,
          DropdownMenuLabel,
          DropdownMenuSeparator,
          DropdownMenuTrigger,
        } from "@/components/ui/dropdown-menu";
        import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
        import { cn } from "@/lib/utils";
        import { CircleUser, Menu, Package2, Home, Book } from "lucide-react";
        import { NavLink, Outlet } from "react-router-dom";

        const navItems = [
          {
            title: "Home",
            to: "/",
            icon: <Home className="h-4 w-4" />,
          },
          {
            title: "Documentation",
            to: "/documentation",
            icon: <Book className="h-4 w-4" />,
          },
        ];

        const Layout = () => {
          return (
            <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
              <Sidebar />
              <div className="flex flex-col">
                <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
                  <MobileSidebar />
                  <div className="w-full flex-1">{/* Add nav bar content here! */}</div>
                  <UserDropdown />
                </header>
                <main className="flex-grow p-4 overflow-auto">
                  <Outlet />
                </main>
              </div>
            </div>
          );
        };

        const Sidebar = () => (
          <div className="hidden border-r bg-muted/40 md:block">
            <div className="flex h-full max-h-screen flex-col gap-2">
              <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                <NavLink to="/" className="flex items-center gap-2 font-semibold">
                  <Package2 className="h-6 w-6" />
                  <span>Acme Inc</span>
                </NavLink>
              </div>
              <div className="flex-1">
                <nav className="grid items-start px-2 text-sm font-medium lg:px-4 gap-2">
                  {navItems.map((item) => (
                    <SidebarNavLink key={item.to} to={item.to}>
                      {item.icon}
                      {item.title}
                    </SidebarNavLink>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        );

        const MobileSidebar = () => (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0 md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <NavLink
                  to="/"
                  className="flex items-center gap-2 text-lg font-semibold mb-4"
                >
                  <Package2 className="h-6 w-6" />
                  <span className="sr-only">Acme Inc</span>
                </NavLink>
                {navItems.map((item) => (
                  <SidebarNavLink key={item.to} to={item.to}>
                    {item.title}
                  </SidebarNavLink>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        );

        const UserDropdown = () => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );

        const SidebarNavLink = ({ to, children }) => (
          <NavLink
            to={to}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary text-muted-foreground",
                isActive && "text-primary bg-muted",
              )
            }
          >
            {children}
          </NavLink>
        );

        export default Layout;
      `,
      notes: "This component provides the navigation structure for the application, including a sidebar and user dropdown menu."
    },
    {
      title: "Index Page",
      description: "The main entry point of the application.",
      examples: `
        import AppIdeaGenerator from "@/components/AppIdeaGenerator";
        import { Card } from "@/components/ui/card";
        import { TooltipProvider } from "@/components/ui/tooltip";

        const Index = () => {
          return (
            <TooltipProvider>
              <div className="text-center">
                <Card className="p-6">
                  <AppIdeaGenerator />
                </Card>
              </div>
            </TooltipProvider>
          );
        };

        export default Index;
      `,
      notes: "This is the main entry point of the application, displaying the App Idea Generator component."
    }
  ];
};