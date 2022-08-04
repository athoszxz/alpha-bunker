import Users from "./users";
import Accounts from "./accounts";
import express from "express";
import Extracts from "./extract";
import Transactions from "./transactions";
import Deposit  from "./deposits";
import Withdraw from "./withdraws";

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(Users);
app.use(Accounts);
app.use(Extracts);
app.use(Transactions)
app.use(Deposit);
app.use(Withdraw);

export default app;
