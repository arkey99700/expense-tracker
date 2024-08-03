import { Autocomplete, AutocompleteProps, TextField } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

type Props<OptionType> = AutocompleteProps<
  OptionType,
  undefined,
  undefined,
  undefined
> & {
  options: unknown[];
  optionLabelKey: string;
  groupByOptions: unknown[];
  groupByKey;

  label: string;
  error?: boolean;
  helperText?: string;
};

export default function AutocompleteTextField<OptionType>(
  props: Props<OptionType>
) {
  return (
    <Autocomplete
      popupIcon={<ExpandMoreIcon />}
      freeSolo
      autoSelect
      options={props.options}
      renderInput={(params) => (
        <TextField
          {...params}
          label={props.label}
          error={props.error}
          helperText={props.helperText ? props.helperText : ""}
        />
      )}
    ></Autocomplete>
  );
}
