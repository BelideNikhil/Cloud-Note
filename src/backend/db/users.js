import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
    {
        _id: uuid(),
        firstName: "Adarsh",
        lastName: "Balika",
        email: "adarshbalika@gmail.com",
        password: "adarshBalika123",
        createdAt: formatDate(),
        updatedAt: formatDate(),
        notes: [],
    },
    {
        _id: uuid(),
        firstName: "Nikhil",
        lastName: "Belide",
        email: "nikhil@gmail.com",
        password: "Password@123",
        createdAt: formatDate(),
        updatedAt: formatDate(),
        notes: [
            {
                bgColor: "#fbccc4",
                createdAt: "06/06/21 09:06:07 pm",
                isPinned: false,
                note: "Go to shop and buy a playstation 5",
                selectedPriority: { Medium: "2" },
                tags: ["Shopping", "Chores"],
                title: "Play Station",
                _id: "b7fcd9c0-2857-4bbd-a81a-a9573db130ba",
            },
            {
                bgColor: "#c7b6e5",
                createdAt: "01/02/21 07:25:07 pm",
                isPinned: false,
                note: "Wash the bike",
                selectedPriority: { High: "3" },
                tags: ["Chores"],
                title: "Bike Wash",
                _id: "b7fcd9c0-2857-4bbd-a81a-a9573db125ab",
            },
            {
                bgColor: "#baf0bf",
                createdAt: "06/06/21 03:55:07 pm",
                isPinned: false,
                note: "Buy notebook and write notes",
                selectedPriority: { Low: "1" },
                tags: ["Neog Notes"],
                title: "Notebook",
                _id: "b7fcd9c0-2857-4bbd-a81a-a9573db100zz",
            },
        ],
    },
];
