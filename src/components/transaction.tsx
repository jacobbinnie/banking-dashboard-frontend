import clsx from "clsx";
import { AccountTransactionDto } from "../../types/generated";
import { Avatar, AvatarFallback } from "./ui/avatar";

interface TransactionProps {
  transaction: AccountTransactionDto;
  minimal?: boolean;
}

function Transaction({ transaction, minimal }: TransactionProps) {
  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: transaction.currency,
  }).format(transaction.amount!);

  return (
    <div
      className={clsx(
        minimal ? "grid-cols-2" : "grid-cols-3",
        "grid items-center w-full"
      )}
    >
      <div>
        <div className="flex flex-row items-center">
          <Avatar className="h-9 w-9">
            <AvatarFallback>OM</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">
              {transaction.transactionInformation}
            </p>
            <p className="text-sm text-muted-foreground">
              {transaction.description}
            </p>
          </div>
        </div>
      </div>
      {!minimal && (
        <p className="text-sm font-medium leading-none text-right">
          {transaction.proprietaryBankTransactionCode?.issuer}
        </p>
      )}
      <p className="font-medium text-right">{formattedAmount}</p>
    </div>
  );
}

export default Transaction;
