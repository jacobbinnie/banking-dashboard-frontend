import { Metadata } from "next";
import BankProviders from "./institutions.json";
import { MainNav } from "@/components/main-nav";
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
import Transaction from "@/components/transaction";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { accountsApi } from "../../../types";
import { Toaster, toast } from "sonner";
import { Icons } from "@/components/icons";
import { AccountAndBalanceDto } from "../../../types/generated";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Example dashboard app built using the components.",
};

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAccount, setSelectedAccount] =
    useState<AccountAndBalanceDto>();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [constructedUrl, setConstructedUrl] = useState<string>();

  const { data: runwayData } = useQuery(
    accountsQuery.accountsControllerGetTotalRunwayInMonths()
  );

  const { data: accountsData } = useQuery(
    accountsQuery.accountsControllerGetAccountsAndBalances()
  );

  const { data: transactions } = useQuery(
    accountsQuery.accountsControllerGetAllTransactions()
  );

  const { data: accountTransactions, isLoading: accountTransactionsLoading } =
    useQuery(
      accountsQuery.accountsControllerGetAccountTransactions({
        data: {
          accountId: selectedAccount?.institution.id,
        },
      })
    );

  const params = new URLSearchParams(window.location.search);
  const authCode = params.get("authcode");
  const authState = params.get("authstate");

  const handleConnectNewBank = async (institutionId: string) => {
    setIsLoading(true);
    try {
      const response =
        await accountsApi.accountsControllerInitiateConnectAccount({
          applicationUserId: "",
          institutionId: institutionId,
        });
      setTimeout(() => {
        setConstructedUrl(response.data);
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const handleVerifyBankConnect = async (
    authCode: string,
    authState: string
  ) => {
    try {
      setIsLoading(true);
      await accountsApi.accountsControllerVerifyConnect({
        authCode,
        authState,
      });

      toast.success("Bank account connected successfully");
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (authCode && authState && !isLoading) {
      handleVerifyBankConnect(authCode, authState);
    }
  }, [authCode, authState]);

  return (
    <>
      <Toaster />
      <Dialog
        open={!!selectedAccount}
        onOpenChange={() => {
          setSelectedAccount(undefined);
        }}
      >
        <DialogContent className="overflow-scroll max-h-[300px]">
          <DialogHeader>
            <DialogTitle>{selectedAccount?.institution.name}</DialogTitle>
          </DialogHeader>

          {isLoading ? (
            <div className="w-full items-center justify-center flex">
              <Icons.spinner className="h-4 w-4 animate-spin" />
            </div>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Recent transactions</CardTitle>
                <CardDescription>
                  {accountTransactions?.transactions.length} transactions in the
                  past 30 days
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {accountTransactions?.transactions.map((transaction) => (
                    <Transaction minimal transaction={transaction} />
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </DialogContent>
      </Dialog>

      <Dialog
        open={dialogOpen}
        onOpenChange={() => {
          setConstructedUrl(undefined);
          setDialogOpen(false);
        }}
      >
        <DialogContent className="overflow-scroll max-h-[300px]">
          <DialogHeader>
            <DialogTitle>Connect a new bank account</DialogTitle>
            <DialogDescription>Select a bank provider</DialogDescription>
          </DialogHeader>

          {isLoading ? (
            <div className="w-full items-center justify-center flex">
              <Icons.spinner className="h-4 w-4 animate-spin" />
            </div>
          ) : (
            <>
              {constructedUrl ? (
                <Button
                  onClick={() => window.open(constructedUrl, "_blank")}
                  variant={"secondary"}
                >
                  Proceed to authenticate →
                </Button>
              ) : (
                <>
                  {BankProviders.map((provider) => (
                    <Card
                      key={provider.institutionId}
                      className="flex w-full items-end justify-between"
                    >
                      <CardHeader>
                        <img src={provider.icon} width={24} />
                        <CardTitle>{provider.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Button
                          className="hover:px-6 transition-all"
                          variant={"secondary"}
                          onClick={() =>
                            handleConnectNewBank(provider.institutionId)
                          }
                        >
                          Connect
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>

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
              <Button onClick={() => setDialogOpen(true)}>
                <PlusIcon className="w-3 h-3 mr-1" />
                Link bank account
              </Button>
            </div>
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {accountsData?.accounts.map((account) => (
                  <AccountCard
                    setSelectedAccount={setSelectedAccount}
                    key={account.id}
                    account={account}
                  />
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
                <Card className="col-span-2 lg:col-span-6">
                  <CardHeader>
                    <CardTitle>Recent transactions</CardTitle>
                    <CardDescription>
                      {transactions?.transactions.length} transactions in the
                      past 30 days
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-8">
                      {transactions?.transactions.map((transaction) => (
                        <Transaction transaction={transaction} />
                      ))}
                    </div>
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
