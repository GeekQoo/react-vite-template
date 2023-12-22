import { ModalConfigProps } from "#/system";

export interface RowProps {
    id: string | number;
    roleName: string;
    remark: string;
    createdAt: string;
    updatedAt: string;
}

type ValueProps = ModalConfigProps<RowProps>;

export interface PropsType {
    value: ValueProps;
    updateValue: (value: ValueProps) => void;
}
