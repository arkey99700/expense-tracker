import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import PageHeader from "../components/PageHeader";
import OperationItemEditForm from "../components/OperationItemEditForm";

export default function AddIncomePage() {
  return (
    <>
      <PageHeader
        title="Добавление дохода"
        icon={<ArrowCircleUpIcon sx={{ width: "40px", height: "40px" }} />}
      ></PageHeader>
      <OperationItemEditForm operation="income" />
    </>
  );
}
