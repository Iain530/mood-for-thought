import { Permissions } from 'expo';

export const REQUIRED = [
    Permissions.NOTIFICATIONS,
    Permissions.CAMERA
];

export const checkAndAskForAllPermissions = async () => {
    return Permissions.askAsync(...REQUIRED);
};

export const checkAllPermissions = async () => {
    return Permissions.getAsync(...REQUIRED);
};
