import OperationItemsList from "../components/OperationItemsList";
import PageHeader from "../components/PageHeader";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";

export default function ExpenseList() {
  return (
    <>
      <PageHeader
        title="Список доходов"
        icon={<ArrowCircleUpIcon sx={{ width: "40px", height: "40px" }} />}
      ></PageHeader>
      <OperationItemsList operation="expense" />
    </>
  );
}
