export interface AlertData {
    showDialog: boolean,
    content?: string,
    dialogAlertType?: AlertType;
}

export type AlertType = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light';