import { Dispatch, SetStateAction } from "react";
import { AccountAndBalanceDto } from "../../types/generated";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface AccountCardProps {
  account: AccountAndBalanceDto;
  setSelectedAccount: Dispatch<
    SetStateAction<AccountAndBalanceDto | undefined>
  >;
}

function AccountCard({ account, setSelectedAccount }: AccountCardProps) {
  const formattedBalance = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: account.currency,
  }).format(account.balance!);

  return (
    <Card
      onClick={() => setSelectedAccount(account)}
      className="cursor-pointer hover:bg-muted transition-all"
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {account.institution?.name}
        </CardTitle>
        {account.institution.media && (
          <img src={account.institution.media[0].source} width={30} />
        )}
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">{formattedBalance}</p>
      </CardContent>
    </Card>
  );
}

export default AccountCard;
