export interface RowProps {
    id: string | number;
    username: string;
}

type ValueProps = System.ModalConfigProps<RowProps>;

export interface PropsType {
    value: ValueProps;
    updateValue: (value: ValueProps) => void;
}
