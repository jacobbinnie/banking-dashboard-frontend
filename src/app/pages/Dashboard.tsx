import { Metadata } from "next";
import Image from "next/image";

import { MainNav } from "@/components/main-nav";
import { Overview } from "@/components/overview";
import { RecentSales } from "@/components/recent-sales";
import { Search } from "@/components/search";
import TeamSwitcher from "@/components/team-switcher";
import { UserNav } from "@/components/user-nav";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DownloadIcon, PlusIcon } from "@radix-ui/react-icons";
import { accountsQuery } from "../../../types/queries";
import { useQuery } from "@tanstack/react-query";
import AccountCard from "@/components/account-card";
import ChartCard from "@/components/chart-card";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Example dashboard app built using the components.",
};

export default function Dashboard() {
  const {
    data: runwayData,
    error: runwayError,
    isLoading: runwayLoading,
  } = useQuery(accountsQuery.accountsControllerGetTotalRunwayInMonths());

  const {
    data: accountsData,
    error: accountsError,
    isLoading: accountsIsLoading,
  } = useQuery(accountsQuery.accountsControllerGetAccountsAndBalances());

  console.log(accountsData);

  return (
    <>
      <div className="flex flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <TeamSwitcher />
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <Search />
              <UserNav />
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Accounts</h2>
            <div className="flex items-center space-x-2">
              <Button variant={"secondary"}>
                <DownloadIcon className="w-5 h-5" />
              </Button>
              <Button>
                <PlusIcon className="w-3 h-3 mr-1" />
                Link bank account
              </Button>
            </div>
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {accountsData?.accounts.map((account) => (
                  <AccountCard account={account} />
                ))}
              </div>
              <div className="grid gap-y-4 lg:gap-4 md:grid-cols-2 lg:grid-cols-6">
                <ChartCard
                  type="BURN"
                  title={"Runway & cash zero"}
                  total={runwayData?.totalRunway ?? 0}
                />
                <ChartCard
                  type="FLOW"
                  title={"Monthly income"}
                  total={runwayData?.monthlyIncoming ?? 0}
                />
                <ChartCard
                  type="FLOW"
                  title={"Monthly spend"}
                  total={runwayData?.monthlyOutgoing ?? 0}
                />
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Recent Sales</CardTitle>
                    <CardDescription>
                      You made 265 sales this month.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RecentSales />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
