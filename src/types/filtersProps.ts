import { frameworks } from './frameworks';

export interface filtersProps {
    frameworks: frameworks;
    updateFramework: (checked: boolean, index: number) => void;
    selectedOwner: string;
    owners: string[];
}
