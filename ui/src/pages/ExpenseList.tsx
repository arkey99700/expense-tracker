import OperationItemsList from "../components/OperationItemsList";
import PageHeader from "../components/PageHeader";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";

export default function ExpenseList() {
  return (
    <>
      <PageHeader
        title="Список расходов"
        icon={<ArrowCircleDownIcon sx={{ width: "40px", height: "40px" }} />}
      ></PageHeader>
      <OperationItemsList operation="expense" />
    </>
  );
}
