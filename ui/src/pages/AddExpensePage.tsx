import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import PageHeader from "../components/PageHeader";
import OperationItemEditForm from "../components/OperationItemEditForm";

export default function AddExpensePage() {
  return (
    <>
      <PageHeader
        title="Добавление расхода"
        icon={<ArrowCircleDownIcon sx={{ width: "40px", height: "40px" }} />}
      ></PageHeader>
      <OperationItemEditForm operation="expense" />
    </>
  );
}
