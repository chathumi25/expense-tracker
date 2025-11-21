
import {
    LuLayoutDashboard,
    LuHandCoins,
    LuWalletMinimal,
} from 'react-icons/lu';
// REPLACE LuLogout WITH HiOutlineLogout FROM react-icons/hi
import { HiOutlineLogout } from 'react-icons/hi';

export const SIDE_MENU_DATA = [
    {
        id: "o1",
        label: "Dashboard",
        icon: LuLayoutDashboard,
        path: "/dashboard"
    },
    {
        id: "o2",
        label: "Income",
        icon: LuWalletMinimal,
        path: "/income"
    },
    {
        id: "o3",
        label: "Expense",
        icon: LuHandCoins,
        path: "/expense"
    },
    {
        id: "o4",
        label: "Logout",
        icon: HiOutlineLogout, // updated here
        path: "logout"
    }
];
