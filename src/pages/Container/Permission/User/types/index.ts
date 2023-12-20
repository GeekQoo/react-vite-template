import { ModalConfigProps } from "#/system";

export interface RowProps {
    id: string | number;
    username: string;
    password: string;
    nickname: string;
    email: string;
    phone: string;
}

type ValueProps = ModalConfigProps<RowProps>;

export interface PropsType {
    value: ValueProps;
    updateValue: (value: ValueProps) => void;
}
